const AnonymousTip = require('../models/AnonymousTip');

// Submit Tip (Public)
exports.submitTip = async (req, res) => {
    const { description, location, incident_date, media_urls } = req.body;
    try {
        const tip = new AnonymousTip({
            description,
            location,
            incident_date,
            media_urls
            // IP hash logic omitted for simplicity/privacy
        });
        await tip.save();
        res.status(201).json({ message: 'Tip submitted securely. Thank you.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Tips (Police)
exports.getAllTips = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    try {
        const tips = await AnonymousTip.find().sort({ created_at: -1 });
        res.json(tips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Status (Police)
exports.updateTipStatus = async (req, res) => {
    if (req.user.role !== 'OFFICER' && req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;
    const { status } = req.body;
    try {
        const tip = await AnonymousTip.findByIdAndUpdate(id, { status }, { new: true });
        res.json(tip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
