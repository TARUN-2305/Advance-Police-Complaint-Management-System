const express = require('express');
const router = express.Router();
const internalNoteController = require('../controllers/internalNoteController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Valid routes: /api/notes/complaints/:id
router.post('/complaints/:id', authenticateToken, authorizeRole(['OFFICER', 'ADMIN']), internalNoteController.addNote);
router.get('/complaints/:id', authenticateToken, authorizeRole(['OFFICER', 'ADMIN']), internalNoteController.getNotes);

module.exports = router;
