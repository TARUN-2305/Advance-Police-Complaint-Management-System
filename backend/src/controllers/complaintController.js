const { PrismaClient } = require('@prisma/client');
const CaseUpdate = require('../models/CaseUpdate');
const EvidenceRecord = require('../models/EvidenceRecord');
const InternalNote = require('../models/InternalNote');
const PDFDocument = require('pdfkit');
const sendEmail = require('../utils/emailService');
const AIService = require('../ai_module'); // Import AI Service

const prisma = new PrismaClient();

// Lodge Complaint
exports.lodgeComplaint = async (req, res) => {
    const { title, description, incident_location, incident_date, category } = req.body;

    // Smart Assignment Logic
    let assignedStationId = 1; // Default to Central Station/Commissioner

    // Fetch all stations
    const stations = await prisma.policeStation.findMany();
    const locationLower = incident_location.toLowerCase();

    // 1. Direct Location Match (e.g. "Indiranagar" matches "Indiranagar PS")
    let matchedStation = stations.find(s =>
        s.station_name.toLowerCase().includes(locationLower) ||
        s.location.toLowerCase().includes(locationLower)
    );

    // 2. Jurisdiction Match (if no direct match)
    if (!matchedStation) {
        matchedStation = stations.find(s => {
            if (!s.jurisdiction_areas) return false;
            const areas = s.jurisdiction_areas.toLowerCase().split(',').map(a => a.trim());
            return areas.some(area => locationLower.includes(area));
        });
    }

    if (matchedStation) {
        assignedStationId = matchedStation.station_id;
        console.log(`📍 Rutode complaint to ${matchedStation.station_name} based on location: ${incident_location}`);
    } else {
        console.log(`⚠️ No specific station found for: ${incident_location}. Defaulting to Station ID 1.`);
    }

    try {
        const complaint = await prisma.complaint.create({
            data: {
                victim_id: req.user.id,
                title,
                description,
                incident_location,
                incident_date: incident_date ? new Date(incident_date) : undefined,
                category,
                station_id: assignedStationId,
                current_status: 'PENDING'
            },
            include: { station: true } // Return station details so user sees where it went
        });

        // Initialize Mongo Case Update doc
        await new CaseUpdate({ complaint_id: complaint.complaint_id, updates: [] }).save();

        // Notifications
        const io = req.app.get('io');
        // Notify Officers
        io.emit('new_complaint', {
            id: complaint.complaint_id,
            station_id: assignedStationId,
            message: `New Complaint at ${complaint.station?.station_name || 'Station ' + assignedStationId}`
        });

        // Notify Victim via Email
        const victim = await prisma.victim.findUnique({ where: { victim_id: req.user.id } });
        if (victim) {
            await sendEmail(
                victim.email,
                `Complaint #CPL-${complaint.complaint_id} Lodged`,
                `Hello ${victim.full_name},\n\nYour complaint has been successfully lodged.\nAssigned Station: ${complaint.station?.station_name}\n\nTrack status online.`
            );
        }

        // --- AI MODULE INTEGRATION (Async Hook) ---
        // Fire and forget - do not await
        setImmediate(() => {
            AIService.triggerAnalysis(complaint.complaint_id, description + " " + title)
                .catch(err => console.error("AI Trigger Error:", err));
        });
        // ------------------------------------------

        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get My Complaints (Victim)
exports.getMyComplaints = async (req, res) => {
    try {
        const complaints = await prisma.complaint.findMany({
            where: { victim_id: req.user.id },
            include: { station: true, assigned_officer: true }
        });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Complaints (Officer - for their station)
// Simplified: Officer sees all complaints assigned to them or their station
// Get All Complaints (Officer - assignments + shared)
exports.getAllComplaints = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    try {
        const officer = await prisma.policeOfficer.findUnique({ where: { officer_id: req.user.id } });

        const complaints = await prisma.complaint.findMany({
            where: {
                OR: [
                    { station_id: officer.station_id }, // My Station's cases
                    { shared_with: { some: { officer_id: req.user.id } } } // Cases shared with me
                ]
            },
            include: { victim: true, shared_with: true }
        });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Complaint Details (SQL + Mongo)
exports.getComplaintDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await prisma.complaint.findUnique({
            where: { complaint_id: parseInt(id) },
            include: { victim: true, station: true, assigned_officer: true, feedback: true, shared_with: true }
        });

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        // Authorization Check
        if (req.user.role === 'VICTIM' && complaint.victim_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Police Access Check (Station or Shared)
        if (req.user.role === 'OFFICER') {
            // Check if officer is in shared_with list or same station
            const isShared = complaint.shared_with.some(o => o.officer_id === req.user.id);
            const isSameStation = complaint.station_id === req.user.station_id; // Need to fetch user station first if not in token

            // Simplification: If they can fetch it via getAllComplaints, they can see it.
            // But for now, we rely on the implicit station check. 
            // We need to fetch the officer's station_id effectively or rely on the frontend behaving.
            // Ideally we check DB against req.user.id.

            // For safety, let's trust if they are hitting this endpoint they might have access, 
            // but strictly we should check.
            // Since we fetched `complaint` with `station` and `shared_with`...

            // Check logic:
            // 1. Same Station
            // 2. Assigned Officer
            // 3. Shared With

            // We need to know req.user.station_id. It's usually in the token or we fetch it.
            // Assuming it's NOT in token for now, let's fetch officer details or assume frontend is right?
            // NO, security first. Fetch officer station.
            const officer = await prisma.policeOfficer.findUnique({ where: { officer_id: req.user.id } });
            if (complaint.station_id !== officer.station_id && !isShared) {
                return res.status(403).json({ message: 'Access denied to this case' });
            }
        }

        // Fetch Mongo Data
        const updatesDoc = await CaseUpdate.findOne({ complaint_id: parseInt(id) });
        let evidence = await EvidenceRecord.find({ complaint_id: parseInt(id) });

        let updates = updatesDoc ? updatesDoc.updates : [];

        // Filter for Victim
        if (req.user.role === 'VICTIM') {
            updates = updates.filter(u => u.visibility === 'VICTIM' || u.visibility === 'PUBLIC');
            // Victim sees their own uploads and Public/Victim visible police uploads
            evidence = evidence.filter(e => e.visibility !== 'PRIVATE' && e.visibility !== 'POLICE_ONLY');
        }

        res.json({ ...complaint, timeline: updates, evidence });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Status (SQL)
exports.updateStatus = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;
    const { status, remarks } = req.body;

    try {
        const complaint = await prisma.complaint.update({
            where: { complaint_id: parseInt(id) },
            data: { current_status: status }
        });

        // Log in History
        await prisma.complaintStatus.create({
            data: {
                complaint_id: parseInt(id),
                status,
                updated_by_officer_id: req.user.id,
                remarks
            }
        });

        // Add to Mongo Timeline automatically
        await CaseUpdate.findOneAndUpdate(
            { complaint_id: parseInt(id) },
            {
                $push: {
                    updates: {
                        text: `Status changed to ${status}: ${remarks}`,
                        author_role: 'POLICE',
                        author_id: req.user.id,
                        visibility: 'VICTIM'
                    }
                }
            }
        );

        res.json(complaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Case Update (Mongo)
exports.addCaseUpdate = async (req, res) => {
    const { id } = req.params;
    const { text, visibility } = req.body;

    try {
        const update = await CaseUpdate.findOneAndUpdate(
            { complaint_id: parseInt(id) },
            {
                $push: {
                    updates: {
                        text,
                        author_role: req.user.role, // 'POLICE' or 'VICTIM'
                        author_id: req.user.id,
                        visibility: visibility || 'VICTIM'
                    }
                }
            },
            { new: true, upsert: true }
        );
        res.json(update);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add Evidence (Mongo)
exports.addEvidence = async (req, res) => {
    const { id } = req.params;
    const { file_url, evidence_type, description, visibility } = req.body;

    try {
        const evidence = new EvidenceRecord({
            complaint_id: parseInt(id),
            evidence_type,
            file_url,
            description,
            uploaded_by_officer_id: req.user.role === 'OFFICER' ? req.user.id : undefined,
            uploaded_by_victim_id: req.user.role === 'VICTIM' ? req.user.id : undefined,
            visibility: visibility || (req.user.role === 'OFFICER' ? 'PRIVATE' : 'VICTIM')
        });
        await evidence.save();
        res.json(evidence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Public Complaint Details (No Auth)
exports.getPublicComplaintDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await prisma.complaint.findUnique({
            where: { complaint_id: parseInt(id) },
            include: { station: true } // Only safe relations
        });

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        // Fetch Mongo Data (Timeline)
        const updates = await CaseUpdate.findOne({ complaint_id: parseInt(id) });

        // Filter for PUBLIC visibility only
        const publicTimeline = updates ? updates.updates.filter(u => u.visibility === 'PUBLIC') : [];

        // Return sanitized object
        const sanitized = {
            complaint_id: complaint.complaint_id,
            title: complaint.title, // Title is generally safe
            category: complaint.category,
            current_status: complaint.current_status,
            incident_location: complaint.incident_location,
            station: complaint.station,
            created_at: complaint.created_at,
            timeline: publicTimeline
        };

        res.json(sanitized);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Handle File Upload
exports.uploadFile = (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ fileUrl, originalName: req.file.originalname, type: req.file.mimetype });
};

// Transfer Case
// Transfer Complaint
exports.transferComplaint = async (req, res) => {
    // ... existing transfer logic ...
    const allowed = ['OFFICER', 'ADMIN'];
    if (!allowed.includes(req.user.role)) return res.status(403).json({ message: 'Access denied' });

    const { id } = req.params;
    const { target_station_id, reason } = req.body;

    try {
        const targetStation = await prisma.policeStation.findUnique({ where: { station_id: parseInt(target_station_id) } });
        if (!targetStation) return res.status(404).json({ message: 'Target station not found' });

        const complaint = await prisma.complaint.update({
            where: { complaint_id: parseInt(id) },
            data: {
                station_id: parseInt(target_station_id),
                assigned_officer_id: null,
                is_transferred: true,
                current_status: 'PENDING'
            }
        });

        await prisma.complaintStatus.create({
            data: {
                complaint_id: parseInt(id),
                status: 'TRANSFERRED',
                updated_by_officer_id: req.user.id,
                remarks: `Transferred to ${targetStation.station_name}. Reason: ${reason}`
            }
        });

        await CaseUpdate.findOneAndUpdate(
            { complaint_id: parseInt(id) },
            {
                $push: {
                    updates: {
                        text: `Case transferred to ${targetStation.station_name}.`,
                        author_role: 'POLICE',
                        author_id: req.user.id,
                        visibility: 'VICTIM'
                    }
                }
            }
        );

        res.json({ message: 'Transfer successful', complaint });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Share Complaint (Collaboration)
exports.shareComplaint = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;
    const { officer_id } = req.body;

    try {
        const complaint = await prisma.complaint.update({
            where: { complaint_id: parseInt(id) },
            data: {
                shared_with: {
                    connect: { officer_id: parseInt(officer_id) }
                }
            },
            include: { shared_with: true }
        });

        res.json({ message: 'Case shared successfully', shared_with: complaint.shared_with });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Officers (for sharing selection)
exports.getAllOfficers = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    try {
        const officers = await prisma.policeOfficer.findMany({
            select: { officer_id: true, full_name: true, rank: true, badge_number: true, station: { select: { station_name: true } } }
        });
        res.json(officers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addInternalNote = async (req, res) => {
    const allowed = ['OFFICER', 'ADMIN'];
    if (!allowed.includes(req.user.role)) return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;
    const { content } = req.body;

    try {
        const officer = await prisma.policeOfficer.findUnique({ where: { officer_id: req.user.id } });

        const note = new InternalNote({
            complaint_id: parseInt(id),
            officer_id: req.user.id,
            officer_name: officer ? officer.full_name : 'Unknown Officer',
            content
        });
        await note.save();
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInternalNotes = async (req, res) => {
    const allowed = ['OFFICER', 'ADMIN'];
    if (!allowed.includes(req.user.role)) return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;

    try {
        const notes = await InternalNote.find({ complaint_id: parseInt(id) }).sort({ created_at: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Submit Feedback
exports.submitFeedback = async (req, res) => {
    if (req.user.role !== 'VICTIM') return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;
    const { rating, comment } = req.body;

    try {
        const feedback = await prisma.feedback.create({
            data: {
                complaint_id: parseInt(id),
                rating: parseInt(rating),
                comment
            }
        });
        res.status(201).json(feedback);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

// Generate FIR PDF
exports.generateFIR = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await prisma.complaint.findUnique({
            where: { complaint_id: parseInt(id) },
            include: { victim: true, station: true }
        });

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        // Auth Check
        const allowed = ['OFFICER', 'ADMIN', 'VICTIM'];
        if (!allowed.includes(req.user.role)) return res.status(403).json({ message: 'Access denied' });
        if (req.user.role === 'VICTIM' && complaint.victim_id !== req.user.id) return res.status(403).json({ message: 'Access denied' });

        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=FIR_CPL_${complaint.complaint_id}.pdf`);

        doc.pipe(res);

        // Header
        doc.fontSize(20).text('FIRST INFORMATION REPORT', { align: 'center', underline: true });
        doc.moveDown();
        doc.fontSize(12).text('POLICE DEPARTMENT', { align: 'center' });
        doc.moveDown();
        doc.moveTo(50, 100).lineTo(550, 100).stroke();
        doc.moveDown();

        // Details
        doc.fontSize(12).font('Helvetica-Bold').text(`FIR Number: CPL-${complaint.complaint_id}`);
        doc.font('Helvetica').text(`Date & Time: ${new Date(complaint.created_at).toLocaleString()}`);
        doc.text(`Police Station: ${complaint.station ? complaint.station.station_name : 'Pending Assignment'}`);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Complainant Details:');
        doc.font('Helvetica').text(`Name: ${complaint.victim?.full_name}`);
        doc.text(`Contact: ${complaint.victim?.phone_number || 'N/A'}`);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Incident Details:');
        doc.font('Helvetica').text(`Category: ${complaint.category}`);
        doc.text(`Location: ${complaint.incident_location}`);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Description:');
        doc.font('Helvetica').text(complaint.description, { align: 'justify' });
        doc.moveDown();

        doc.moveDown();
        doc.font('Helvetica-Bold').text(`Current Status: ${complaint.current_status}`);

        doc.moveDown(4);
        doc.fontSize(10).text('This is a digitally generated report.', { align: 'center', color: 'grey' });

        doc.end();

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
