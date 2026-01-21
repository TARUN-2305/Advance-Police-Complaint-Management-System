const mongoose = require('mongoose');

const AnonymousTipSchema = new mongoose.Schema({
    description: { type: String, required: true },
    location: { type: String },
    incident_date: { type: Date },
    media_urls: [{ type: String }],
    status: { type: String, default: 'UNVERIFIED' }, // UNVERIFIED, INVESTIGATING, DISCARDED
    ip_hash: { type: String }, // Store hashed IP for audit if needed, but keep anonymity
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnonymousTip', AnonymousTipSchema);
