const { PrismaClient } = require('@prisma/client');
const CaseUpdate = require('../models/CaseUpdate');
const EvidenceRecord = require('../models/EvidenceRecord');

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
    if (req.user.role !== 'OFFICER') return res.status(403).json({ message: 'Access denied' });
    try {
        // Fetch officer's station
        const officer = await prisma.policeOfficer.findUnique({ where: { officer_id: req.user.id } });

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
// Get Complaint Details (SQL + Mongo)
exports.getComplaintDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const complaint = await prisma.complaint.findUnique({
            where: { complaint_id: parseInt(id) },
            include: { victim: true, station: true, assigned_officer: true }
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
            // For now, assuming all evidence uploaded by anyone is visible to Victim unless strictly flagged? 
            // Better safe: Police uploads default to PRIVATE.
            // Let's filter evidence: Show everything for now as per user request "visible to police", 
            // but usually police evidence is private. 
            // User asked: "Complaint... visible to police right?" -> Yes.
            // User asked: "Complaint visible to victim?" -> Yes.
            // But Police internal evidence shouldn't be visible.
            evidence = evidence.filter(e => e.visibility !== 'PRIVATE' && e.visibility !== 'POLICE_ONLY');
        }

        res.json({ ...complaint, timeline: updates, evidence });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Status (SQL)
exports.updateStatus = async (req, res) => {
    if (req.user.role !== 'OFFICER') return res.status(403).json({ message: 'Access denied' });
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
// Add Evidence (Mongo)
exports.addEvidence = async (req, res) => {
    const { id } = req.params;
    const { file_url, evidence_type, description, visibility } = req.body;

    // Allow Officer OR Victim (if they own the case)
    // For simplicity, we assume the AuthMiddleware protects the user identity.
    // Ideally we check ownership if Victim.

    try {
        const evidence = new EvidenceRecord({
            complaint_id: parseInt(id),
            evidence_type,
            file_url,
            description,
            uploaded_by_officer_id: req.user.role === 'OFFICER' ? req.user.id : null,
            visibility: visibility || (req.user.role === 'OFFICER' ? 'PRIVATE' : 'POLICE_ONLY')
            // Victim uploads are 'POLICE_ONLY' (visible to police) by default
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
