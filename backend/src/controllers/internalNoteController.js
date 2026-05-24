const InternalNote = require('../models/InternalNote');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a Note
exports.addNote = async (req, res) => {
    const { id } = req.params; // Complaint ID
    const { content } = req.body;

    if (!content) return res.status(400).json({ message: 'Note content is required' });

    try {
        // Verify Complaint Exists
        const complaint = await prisma.complaint.findUnique({ where: { complaint_id: parseInt(id) } });
        if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

        // Create Note (Mongo)
        const note = new InternalNote({
            complaint_id: parseInt(id),
            officer_id: req.user.id,
            officer_name: req.user.full_name || 'Officer', // Assuming middleware adds full_name
            content
        });

        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Notes for a Complaint
exports.getNotes = async (req, res) => {
    const { id } = req.params;

    try {
        const notes = await InternalNote.find({ complaint_id: parseInt(id) }).sort({ created_at: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
