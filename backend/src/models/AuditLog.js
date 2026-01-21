const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    actor_id: { type: String, required: true }, // ID of user
    actor_role: { type: String, required: true }, // OFFICER, ADMIN, VICTIM
    actor_ip: { type: String },
    action: { type: String, required: true }, // VIEW_DETAILS, SEARCH, LOGIN_SUCCESS
    resource: { type: String }, // Endpoint or Entity ID logic
    details: { type: Object }, // Metadata (e.g. "Viewed Complaint #123")
    timestamp: { type: Date, default: Date.now, immutable: true } // Append-only
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
