const logAudit = require('../utils/auditLogger');

const auditMiddleware = (action) => {
    return (req, res, next) => {
        // Capture original end to verify success if needed, or just use 'finish' event
        res.on('finish', () => {
            // Log only successful accesses for "Viewed" actions to avoid logging 403s as "Viewed"
            if (res.statusCode >= 200 && res.statusCode < 300) {
                logAudit(req, action, req.originalUrl, {
                    params: req.params,
                    query: req.query,
                    method: req.method
                });
            }
        });
        next();
    };
};

module.exports = auditMiddleware;
