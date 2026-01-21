const { PrismaClient } = require('@prisma/client');
const CaseUpdate = require('../models/CaseUpdate');
const EvidenceRecord = require('../models/EvidenceRecord');
const InternalNote = require('../models/InternalNote');
const PDFDocument = require('pdfkit');
const sendEmail = require('../utils/emailService');

const prisma = new PrismaClient();

// Lodge Complaint
exports.lodgeComplaint = async (req, res) => {
    const { title, description, incident_location, category } = req.body;

    // Simple Auto-Assignment Logic (Mock GIS)
    let assignedStationId = 1; // Default

    // Fetch all stations to find a match
    const stations = await prisma.policeStation.findMany();
    const locationLower = incident_location.toLowerCase();

    const matchedStation = stations.find(s => locationLower.includes(s.location.toLowerCase()));

    if (matchedStation) {
        assignedStationId = matchedStation.station_id;
    }

    try {
        const complaint = await prisma.complaint.create({
            data: {
                victim_id: req.user.id,
                title,
                description,
                incident_location,
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
exports.getAllComplaints = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    try {
        const officer = await prisma.policeOfficer.findUnique({ where: { officer_id: req.user.id } });

        // If Admin, show ALL complaints? Or still restricted? 
        // For now, if role is ADMIN, maybe show all?
        // Let's keep it station-based unless Admin explicitly asks for All.
        // Assuming Admin has a 'station_id' (HQ). They see HQ cases.
        // Let's enable View All for Admin later.

        const complaints = await prisma.complaint.findMany({
            where: { station_id: officer.station_id },
            include: { victim: true }
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
            include: { victim: true, station: true, assigned_officer: true, feedback: true }
        });

        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        // Authorization Check
        if (req.user.role === 'VICTIM' && complaint.victim_id !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
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
            uploaded_by_officer_id: req.user.role === 'OFFICER' ? req.user.id : null,
            visibility: visibility || (req.user.role === 'OFFICER' ? 'PRIVATE' : 'POLICE_ONLY')
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
exports.transferComplaint = async (req, res) => {
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

// Internal Notes
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
