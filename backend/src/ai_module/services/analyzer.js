/**
 * AI Complaint Analyzer Service
 * 
 * Deterministic, rule-based NLP pipeline for analyzing police complaints.
 * Focuses on Severity Scoring, Category Prediction, and Entity Extraction.
 */

// Keyword Dictionaries
const KEYWORDS = {
    VIOLENCE: ['kill', 'murder', 'attack', 'assault', 'beat', 'hit', 'weapon', 'gun', 'knife', 'shoot', 'blood', 'injury', 'dead', 'death', 'threat', 'rape', 'sexual', 'force'],
    URGENCY: ['now', 'urgent', 'immediately', 'emergency', 'help', 'dying', 'danger', 'trapped', 'fire', 'explosion', 'terrorist', 'bomb'],
    VULNERABLE: ['child', 'kid', 'baby', 'minor', 'woman', 'girl', 'senior', 'elderly', 'old', 'disabled', 'handicapped'],
    THEFT: ['steal', 'stole', 'rob', 'theft', 'burglary', 'snatch', 'lost', 'missing', 'pickpocket'],
    CYBER: ['hack', 'scam', 'fraud', 'online', 'bank', 'password', 'otp', 'phishing', 'account'],
    HARASSMENT: ['harass', 'stalk', 'abuse', 'bully', 'follow', 'threaten', 'blackmail']
};

class AnalyzerService {

    /**
     * Analyze a complaint text and return structured insights.
     * @param {string} text - The complaint description/title.
     * @returns {Object} Analysis result.
     */
    static analyze(text) {
        if (!text) return null;

        const normalizedText = text.toLowerCase();

        const severity = this.calculateSeverity(normalizedText);
        const category = this.predictCategory(normalizedText);
        const entities = this.extractEntities(text); // Use original text for case-sensitivity

        return {
            severity_score: severity.score,
            urgency_level: severity.urgency,
            explanation: severity.explanation,
            predicted_category: category,
            extracted_entities: entities,
            confidence_score: 0.85 // Heuristic confidence
        };
    }

    static calculateSeverity(text) {
        let score = 10; // Base score
        let explanations = [];

        // 1. Check for Violence (High Impact)
        const violenceMatches = KEYWORDS.VIOLENCE.filter(w => text.includes(w));
        if (violenceMatches.length > 0) {
            score += 40;
            explanations.push(`Detected violence keywords: ${violenceMatches.slice(0, 3).join(', ')}`);
        }

        // 2. Check for Urgency
        const urgencyMatches = KEYWORDS.URGENCY.filter(w => text.includes(w));
        if (urgencyMatches.length > 0) {
            score += 20;
            explanations.push(`Detected urgency keywords: ${urgencyMatches.slice(0, 3).join(', ')}`);
        }

        // 3. Vulnerable Victims
        const vulnerableMatches = KEYWORDS.VULNERABLE.filter(w => text.includes(w));
        if (vulnerableMatches.length > 0) {
            score += 15;
            explanations.push(`Potential vulnerable victim involvement: ${vulnerableMatches.slice(0, 3).join(', ')}`);
        }

        // Cap score at 100
        score = Math.min(score, 100);

        // Determine Urgency Level
        let urgency = 'LOW';
        if (score > 75) urgency = 'HIGH';
        else if (score > 40) urgency = 'MEDIUM';

        return { score, urgency, explanation: explanations.join('. ') };
    }

    static predictCategory(text) {
        // Simple winner-takes-all classification
        let scores = {
            'Theft/Burglary': 0,
            'Cybercrime': 0,
            'Harassment/Abuse': 0,
            'Assault/Violence': 0,
            'Missing Person': 0
        };

        KEYWORDS.THEFT.forEach(w => { if (text.includes(w)) scores['Theft/Burglary'] += 2; });
        KEYWORDS.CYBER.forEach(w => { if (text.includes(w)) scores['Cybercrime'] += 2; });
        KEYWORDS.HARASSMENT.forEach(w => { if (text.includes(w)) scores['Harassment/Abuse'] += 2; });
        KEYWORDS.VIOLENCE.forEach(w => { if (text.includes(w)) scores['Assault/Violence'] += 2; });

        // Default if unknown
        let maxScore = 0;
        let bestCategory = 'General/Other';

        for (const [cat, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                bestCategory = cat;
            }
        }

        return bestCategory;
    }

    static extractEntities(text) {
        const entities = {
            dates: [],
            times: [],
            phone_numbers: [],
            emails: []
        };

        // Date extraction (Basic Regex)
        const dateRegex = /\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{4}\b/gi;
        entities.dates = text.match(dateRegex) || [];

        // Time extraction
        const timeRegex = /\b\d{1,2}:\d{2}(?:\s?[ap]\.?m\.?)?\b/gi;
        entities.times = text.match(timeRegex) || [];

        // Phone numbers (Generic Indian mobile pattern)
        const phoneRegex = /\b[6-9]\d{9}\b/g;
        entities.phone_numbers = text.match(phoneRegex) || [];

        // Emails
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        entities.emails = text.match(emailRegex) || [];

        return JSON.stringify(entities);
    }
}

module.exports = AnalyzerService;
