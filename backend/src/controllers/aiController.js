const AIService = require('../ai_module');

exports.getComplaintAnalysis = async (req, res) => {
    const { id } = req.params;
    try {
        const analysis = await AIService.getAnalysis(id);
        if (!analysis) {
            return res.status(404).json({ message: 'AI Analysis not found or pending.' });
        }
        // Parse JSON string back to object for frontend
        if (analysis.extracted_entities && typeof analysis.extracted_entities === 'string') {
            analysis.extracted_entities = JSON.parse(analysis.extracted_entities);
        }
        res.json(analysis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
