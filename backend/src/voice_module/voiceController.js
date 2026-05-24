const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const transcriptionService = require('./transcriptionService');
const extractionService = require('./extractionService');

// Use the AI-specific Prisma client (generated from ai.schema.prisma)
const prisma = require('../ai_module/db/client');

exports.analyzeVoiceComplaint = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    const audioPath = req.file.path;
    const mimeType = req.file.mimetype;

    try {
        console.log(`🎙️ Processing Audio: ${req.file.originalname}`);

        // 1. Transcribe
        const transcript = await transcriptionService.transcribeAudio(audioPath, mimeType);
        if (!transcript) {
            fs.unlinkSync(audioPath); // Cleanup
            return res.status(500).json({ error: 'Transcription failed.' });
        }
        console.log(`📝 Transcript: ${transcript.substring(0, 50)}...`);

        // 2. Extract Data
        const extractedData = await extractionService.extractComplaintData(transcript);
        console.log(`🧠 Extracted Data:`, extractedData);

        // 3. Log to AI DB
        const log = await prisma.voiceComplaintLog.create({
            data: {
                audio_path: audioPath, // Keep for audit or cleanup later
                transcript: transcript,
                extracted_json: JSON.stringify(extractedData || {}),
                confidence: 0.8 // Dummy confidence for now
            }
        });

        // 4. Return to Frontend
        res.json({
            success: true,
            log_id: log.id,
            transcript: transcript,
            data: extractedData
        });

    } catch (error) {
        console.error('❌ Voice Processing Error:', error.message);
        console.error('Stack:', error.stack);
        // Cleanup file on error
        if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
        res.status(500).json({ error: 'Failed to process voice complaint.', details: error.message });
    }
};
