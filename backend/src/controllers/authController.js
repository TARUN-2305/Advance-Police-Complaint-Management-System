const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const prisma = new PrismaClient();

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register Victim
exports.registerVictim = async (req, res) => {
    const { full_name, email, password, phone_number, address } = req.body;
    try {
        const existingUser = await prisma.victim.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.victim.create({
            data: { full_name, email, password_hash: hashedPassword, phone_number, address }
        });

        res.status(201).json({ token: generateToken(user.victim_id, 'VICTIM'), user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Register Officer (Demo purpose)
exports.registerOfficer = async (req, res) => {
    const { full_name, badge_number, email, password, rank, station_id, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const officer = await prisma.policeOfficer.create({
            data: {
                full_name,
                badge_number,
                email,
                password_hash: hashedPassword,
                rank,
                station_id: parseInt(station_id),
                role: role || 'OFFICER',
                is_active: true
            }
        });
        res.status(201).json({ message: 'Officer registered', officer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password, role, totp } = req.body;
    const logAudit = require('../utils/auditLogger');

    try {
        let user;
        if (role === 'VICTIM') {
            user = await prisma.victim.findUnique({ where: { email } });
        } else if (role === 'OFFICER') {
            user = await prisma.policeOfficer.findUnique({ where: { email } });
            if (user && !user.is_active) return res.status(403).json({ message: 'Account is deactivated. Contact Admin.' });
        }

        if (!user) {
            logAudit(req, 'LOGIN_FAILED', '/auth/login', { email, role, reason: 'User not found' });
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            logAudit(req, 'LOGIN_FAILED', '/auth/login', { email, role, reason: 'Bad password' });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 2FA Check
        if (role === 'OFFICER' && user.is_2fa_enabled) {
            if (!totp) return res.status(403).json({ message: '2FA_REQUIRED' });

            const verified = speakeasy.totp.verify({
                secret: user.two_factor_secret,
                encoding: 'base32',
                token: totp
            });
            if (!verified) {
                logAudit(req, 'LOGIN_FAILED_2FA', '/auth/login', { email, role });
                return res.status(400).json({ message: 'Invalid 2FA Code' });
            }
        }

        const id = role === 'VICTIM' ? user.victim_id : user.officer_id;
        const tokenRole = role === 'OFFICER' ? user.role : 'VICTIM';

        // Log Success (Attach user to req for logger)
        req.user = { id, role: tokenRole };
        logAudit(req, 'LOGIN_SUCCESS', '/auth/login');

        res.json({ token: generateToken(id, tokenRole), user, role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOfficers = async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    try {
        const officers = await prisma.policeOfficer.findMany({
            include: {
                station: true,
                _count: {
                    select: { assigned_complaints: true }
                }
            }
        });
        res.json(officers);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.updateOfficer = async (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });
    const { id } = req.params;
    const { rank, station_id, is_active } = req.body;
    try {
        const officer = await prisma.policeOfficer.update({
            where: { officer_id: parseInt(id) },
            data: {
                rank,
                station_id: parseInt(station_id),
                is_active
            }
        });
        res.json(officer);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.setup2FA = async (req, res) => {
    if (!['OFFICER', 'ADMIN'].includes(req.user.role)) return res.status(403).json({ message: 'Restricted' });
    try {
        const secret = speakeasy.generateSecret({ name: `PoliceIS (${req.user.id})` });

        await prisma.policeOfficer.update({
            where: { officer_id: req.user.id },
            data: { two_factor_secret: secret.base32 }
        });

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            res.json({ secret: secret.base32, qr_code: data_url });
        });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.verify2FA = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await prisma.policeOfficer.findUnique({ where: { officer_id: req.user.id } });
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token
        });

        if (verified) {
            await prisma.policeOfficer.update({
                where: { officer_id: req.user.id },
                data: { is_2fa_enabled: true }
            });
            res.json({ message: '2FA Enabled Successfully' });
        } else {
            res.status(400).json({ message: 'Invalid Token' });
        }
    } catch (e) { res.status(500).json({ error: e.message }); }
};
