const express = require('express');
const { registerVictim, login, registerOfficer, getAllOfficers, updateOfficer, setup2FA, verify2FA } = require('../controllers/authController');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/register/victim', registerVictim);
router.post('/register/officer', authMiddleware, registerOfficer); // Protected: Police adding Police

router.get('/officers', authMiddleware, getAllOfficers);
router.put('/officers/:id', authMiddleware, updateOfficer);

// 2FA Routes
router.post('/2fa/setup', authMiddleware, setup2FA);
router.post('/2fa/verify', authMiddleware, verify2FA);

module.exports = router;
