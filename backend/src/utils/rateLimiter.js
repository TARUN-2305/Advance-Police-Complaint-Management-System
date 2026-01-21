const rateLimit = require('express-rate-limit');

exports.publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // 100 requests per 15 min for public APIs (Tips, Search)
    message: { message: "Too many requests from this IP, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 login attempts per 15 min
    message: { message: "Too many login attempts. Account temporarily locked." },
    standardHeaders: true,
    legacyHeaders: false,
});

exports.apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 300, // 300 requests per minute for authenticated APIs
    standardHeaders: true,
    legacyHeaders: false,
});
