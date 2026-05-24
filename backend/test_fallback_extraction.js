/**
 * Extracts structured data from complaint text using simple rule-based parsing
 * Fallback when Gemini API is not available
 */
exports.extractComplaintDataFallback = (transcript) => {
    const lower = transcript.toLowerCase();

    // Detect incident type
    let incident_type = "General";
    if (lower.includes("stol") || lower.includes("snatch") || lower.includes("took my")) incident_type = "Theft";
    if (lower.includes("rob") || lower.includes("forceful")) incident_type = "Robbery";
    if (lower.includes("assault") || lower.includes("beat") || lower.includes("hit")) incident_type = "Assault";
    if (lower.includes("cyber") || lower.includes("hack") || lower.includes("scam") || lower.includes("fraud")) incident_type = "Cybercrime";
    if (lower.includes("lost") || lower.includes("misplaced")) incident_type = "Lost Property";
    if (lower.includes("vehicle") || lower.includes("car") || lower.includes("bike") || lower.includes("motorcycle")) incident_type = "Vehicle Theft";

    // Detect urgency
    let urgency = "MEDIUM";
    if (lower.includes("urgent") || lower.includes("emergency") || lower.includes("critical") || lower.includes("immediately")) urgency = "HIGH";
    if (lower.includes("yesterday") || lower.includes("last week") || lower.includes("not urgent")) urgency = "LOW";

    // Extract location (simple pattern)
    const locationMatch = transcript.match(/(?:at|in|near|from)\s+([A-Z][a-zA-Z\s]+(?:Road|Street|Area|Station|Mall))/);
    const location = locationMatch ? locationMatch[1].trim() : null;

    // Extract date hints
    const dateHints = transcript.match(/(?:yesterday|today|last\s+\w+|on\s+\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i);
    let incident_date = null;
    if (dateHints) {
        const hint = dateHints[0].toLowerCase();
        const today = new Date();
        if (hint.includes("yesterday")) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            incident_date = yesterday.toISOString().split('T')[0];
        } else if (hint.includes("today")) {
            incident_date = today.toISOString().split('T')[0];
        }
    }

    // Extract suspect details
    const suspectMatch = transcript.match(/suspect.{0,200}?(?:\.|$)|(?:male|female).{0,150}?(?:wearing|hoodie|jeans)/i);
    const suspect_details = suspectMatch ? suspectMatch[0].trim() : null;

    return {
        incident_type,
        incident_date,
        incident_location: location,
        description: transcript.substring(0, 300).trim(),
        suspect_details,
        urgency
    };
};

// Test the fallback with the iPhone transcript
const testTranscript = `
Yesterday around 5 PM, I was at MG Road near the metro station 
when someone forcefully snatched my iPhone 15 from my hands. 
It was a black iPhone 15, 256GB variant worth approximately 80,000 rupees. 
The suspect was a male, around 25-30 years old, wearing a blue hoodie and jeans. 
He ran towards the parking area and escaped on a motorcycle. 
This is a very urgent matter as the phone contains important personal and work data.
`;

console.log("🧪 Testing Fallback Extraction\n");
console.log("📝 Test Transcript:");
console.log(testTranscript);
console.log("\n🧠 Extracted Data:");
console.log(JSON.stringify(exports.extractComplaintDataFallback(testTranscript), null, 2));
