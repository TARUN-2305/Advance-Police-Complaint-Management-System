const express = require('express');
const { getComplaintAnalysis } = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure only auth users see it

const router = express.Router();

// GET /api/ai/:id - Get analysis for a complaint
router.get('/:id', authMiddleware, getComplaintAnalysis);

module.exports = router;
