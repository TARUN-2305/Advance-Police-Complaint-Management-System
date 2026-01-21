const AuditLog = require('../models/AuditLog');

const logAudit = async (req, action, resource, details = {}) => {
    try {
        // Fallback for IP extraction behind proxies
        const ip = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;

        await AuditLog.create({
            actor_id: req.user ? req.user.id.toString() : 'ANONYMOUS',
            actor_role: req.user ? req.user.role : 'PUBLIC',
            actor_ip: ip,
            action: action.toUpperCase(),
            resource,
            details
        });
    } catch (err) {
        console.error("CRITICAL: Audit Log Failure", err);
        // In production, sending this to a secondary alerting system (like Sentry) is recommended.
    }
};

module.exports = logAudit;
