const express = require('express');
const {
    lodgeComplaint,
    getMyComplaints,
    getAllComplaints,
    getComplaintDetails,
    getPublicComplaintDetails,
    updateStatus,
    addCaseUpdate,
    addEvidence,
    uploadFile,
    transferComplaint,
    addInternalNote,
    getInternalNotes,
    submitFeedback,
    generateFIR
} = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const router = express.Router();

router.post('/', authMiddleware, lodgeComplaint);
router.get('/my', authMiddleware, getMyComplaints); // For Victims
router.get('/station', authMiddleware, getAllComplaints); // For Officers

const auditMiddleware = require('../middleware/auditMiddleware');

// Public Search Route
router.get('/public/:id', getPublicComplaintDetails);

// File Upload Route
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

router.post('/:id/feedback', authMiddleware, submitFeedback);
router.get('/:id/fir', authMiddleware, auditMiddleware('DOWNLOAD_FIR'), generateFIR);

router.get('/:id', authMiddleware, auditMiddleware('VIEW_COMPLAINT'), getComplaintDetails);
router.put('/:id/status', authMiddleware, updateStatus);
router.put('/:id/transfer', authMiddleware, transferComplaint);
router.post('/:id/updates', authMiddleware, addCaseUpdate);
router.post('/:id/evidence', authMiddleware, addEvidence);

// Internal Notes
router.post('/:id/notes', authMiddleware, addInternalNote);
router.get('/:id/notes', authMiddleware, getInternalNotes);

module.exports = router;
