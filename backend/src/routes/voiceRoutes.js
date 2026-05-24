const express = require('express');
const extractionService = require('../voice_module/extractionService');

const router = express.Router();

// Route: POST /api/voice/extract
// Receives transcript text and returns extracted complaint data using Gemini 2.5 Flash
router.post('/extract', async (req, res) => {
    const { transcript } = req.body;

    if (!transcript || !transcript.trim()) {
        return res.status(400).json({ error: 'No transcript provided.' });
    }

    try {
        console.log(`🎙️ Processing transcript: ${transcript.substring(0, 50)}...`);

        // Extract Data using Gemini (with pattern-matching fallback)
        const extractedData = await extractionService.extractComplaintData(transcript);
        console.log(`🧠 Extracted Data:`, extractedData);

        // Return to Frontend
        res.json({
            success: true,
            data: extractedData
        });

    } catch (error) {
        console.error('❌ Voice Processing Error:', error.message);
        res.status(500).json({ error: 'Failed to process voice complaint.', details: error.message });
    }
});

module.exports = router;
