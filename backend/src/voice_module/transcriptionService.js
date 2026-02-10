const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY is missing. Voice features will fail.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Transcribes audio using Gemini 1.5 Flash.
 * @param {string} audioPath - Path to the audio file.
 * @param {string} mimeType - MIME type of the audio file (e.g., 'audio/mp3', 'audio/wav').
 * @returns {Promise<string>} - The transcription text.
 */
exports.transcribeAudio = async (audioPath, mimeType) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Read audio file as base64
        const audioFile = fs.readFileSync(audioPath);
        const audioBase64 = audioFile.toString("base64");

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: mimeType,
                    data: audioBase64
                }
            },
            { text: "Please transcribe this audio exactly as it is spoken. Do not add any commentary." }
        ]);

        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("❌ Transcription Failed:", error);
        throw new Error("Failed to transcribe audio.");
    }
};
