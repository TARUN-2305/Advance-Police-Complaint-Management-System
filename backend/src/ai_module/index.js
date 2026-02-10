const prisma = require('./db/client');
const AnalyzerService = require('./services/analyzer');

class AIComplaintService {

    /**
     * Trigger analysis for a complaint.
     * This method is designed to be called asynchronously (fire-and-forget).
     * @param {number} complaintId - The ID of the complaint from the main DB.
     * @param {string} text - The complaint description.
     */
    static async triggerAnalysis(complaintId, text) {
        console.log(`[AI] Starting analysis for Complaint #${complaintId}...`);

        try {
            // 1. Perform Analysis (CPU bound, but fast for text)
            const analysis = AnalyzerService.analyze(text);

            if (!analysis) {
                console.warn(`[AI] Analysis skipped for Complaint #${complaintId} (Empty text)`);
                return;
            }

            // 2. Store in AI Database (IO bound)
            await prisma.complaintAnalysis.create({
                data: {
                    complaint_id: complaintId,
                    severity_score: analysis.severity_score,
                    urgency_level: analysis.urgency_level,
                    predicted_category: analysis.predicted_category,
                    confidence_score: analysis.confidence_score,
                    extracted_entities: JSON.stringify(analysis.extracted_entities),
                    explanation: analysis.explanation
                }
            });

            console.log(`[AI] Analysis completed and saved for Complaint #${complaintId}`);

        } catch (error) {
            console.error(`[AI] Analysis FAILED for Complaint #${complaintId}:`, error.message);
            // Fail safely - do not crash the main app
        }
    }

    /**
     * Retrieve analysis for a specific complaint.
     * @param {number} complaintId
     */
    static async getAnalysis(complaintId) {
        try {
            const result = await prisma.complaintAnalysis.findUnique({
                where: { complaint_id: parseInt(complaintId) }
            });
            return result;
        } catch (error) {
            console.error(`[AI] Failed to fetch analysis for #${complaintId}:`, error.message);
            return null;
        }
    }
}

module.exports = AIComplaintService;
