const express = require('express');
const { submitTip, getAllTips, updateTipStatus } = require('../controllers/tipController');
const authMiddleware = require('../middleware/authMiddleware');

const auditMiddleware = require('../middleware/auditMiddleware');

const router = express.Router();

router.post('/', submitTip); // Public
router.get('/', authMiddleware, auditMiddleware('VIEW_ALL_TIPS'), getAllTips);
router.put('/:id/status', authMiddleware, updateTipStatus);

module.exports = router;
