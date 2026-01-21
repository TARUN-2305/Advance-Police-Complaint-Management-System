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
    uploadFile
} = require('../controllers/complaintController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

const router = express.Router();

router.post('/', authMiddleware, lodgeComplaint);
router.get('/my', authMiddleware, getMyComplaints); // For Victims
router.get('/station', authMiddleware, getAllComplaints); // For Officers

// Public Search Route (MUST be before :id to prevent conflict if possible, but 'public/search' is distinct)
router.get('/public/:id', getPublicComplaintDetails);

// File Upload Route
router.post('/upload', authMiddleware, upload.single('file'), uploadFile);

router.get('/:id', authMiddleware, getComplaintDetails);
router.put('/:id/status', authMiddleware, updateStatus);
router.post('/:id/updates', authMiddleware, addCaseUpdate);
router.post('/:id/evidence', authMiddleware, addEvidence);

module.exports = router;
