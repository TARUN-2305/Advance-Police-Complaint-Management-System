const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Extracts structured data from complaint text using Gemini 2.5 Flash
 * Falls back to pattern matching if API fails
 */
exports.extractComplaintData = async (transcript) => {
    // Try Gemini first
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are an AI assistant for a Police Complaint Management System in India.
Extract the following details from the complaint text and return ONLY a valid JSON object (no markdown code blocks, no explanations):

{
  "incident_type": "one of: Theft, Robbery, Assault, Cybercrime, Lost Property, Vehicle Theft, Fraud, General",
  "incident_date": "YYYY-MM-DD format if explicitly mentioned, else null",
  "incident_location": "specific location/address if mentioned, else null",
  "description": "brief 1-2 sentence summary of the incident",
  "suspect_details": "physical description of suspect if mentioned, else null",
  "urgency": "HIGH, MEDIUM, or LOW based on severity and time sensitivity",
  "severity_score": "1-10 integer (10 being most critical)",
  "severity_explanation": "brief reasoning for the severity score"
}

Complaint Text: "${transcript}"

Return ONLY the JSON object:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text().trim();

        // Clean up markdown code blocks if present
        text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

        const extracted = JSON.parse(text);
        console.log("✅ Gemini extraction successful");
        return extracted;

    } catch (error) {
        console.warn("⚠️ Gemini failed, using pattern matching fallback:", error.message);

        // Fallback to pattern matching
        const lower = transcript.toLowerCase();

        let incident_type = "General";
        if (lower.match(/stol|snatch|took\s+my|grabbed|theft/)) incident_type = "Theft";
        if (lower.match(/rob|forceful|gunpoint|knifepoint/)) incident_type = "Robbery";
        if (lower.match(/assault|beat|hit|attack|violence/)) incident_type = "Assault";
        if (lower.match(/cyber|hack|scam|fraud|phishing|online/)) incident_type = "Cybercrime";

        let urgency = "MEDIUM";
        if (lower.match(/urgent|emergency|critical|immediately|serious/)) urgency = "HIGH";

        const locationMatch = transcript.match(/(?:at|in|near|from)\s+([A-Z][a-zA-Z\s]+(?:Road|Street|Area|Station|Mall))/);
        const location = locationMatch ? locationMatch[1].trim() : null;

        let incident_date = null;
        const today = new Date();
        if (lower.match(/yesterday/)) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            incident_date = yesterday.toISOString().split('T')[0];
        } else if (lower.match(/today/)) {
            incident_date = today.toISOString().split('T')[0];
        }

        const suspectMatch = transcript.match(/suspect\s+was\s+.{10,200}?(?:\.|$)|(?:male|female).{0,150}?(?:wearing|hoodie|jeans)/i);
        const suspect_details = suspectMatch ? suspectMatch[0].trim() : null;

        return {
            incident_type,
            incident_date,
            incident_location: location,
            description: transcript.substring(0, 300).trim(),
            suspect_details,
            urgency,
            severity_score: urgency === 'HIGH' ? 8 : (urgency === 'MEDIUM' ? 5 : 3),
            severity_explanation: "Auto-generated based on urgency keywords."
        };
    }
};
