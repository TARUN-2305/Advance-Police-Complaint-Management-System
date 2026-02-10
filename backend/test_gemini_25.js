const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testGemini25Flash() {
    try {
        console.log("🧪 Testing Gemini 2.5 Flash\n");

        console.log(`API Key: ${process.env.GEMINI_API_KEY?.substring(0, 15)}...\n`);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try gemini-2.5-flash (the model that worked in Python)
        console.log("Testing model: gemini-2.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        console.log("Sending test prompt...");
        const result = await model.generateContent("Say 'System Online. Gemini 2.0 is ready.'");
        const response = await result.response;
        const text = response.text();

        console.log("\n✅ SUCCESS!");
        console.log("Response:", text);

        // Now test extraction
        console.log("\n🧠 Testing complaint extraction...");
        const extractionPrompt = `Extract data from this complaint and return ONLY valid JSON:
"Yesterday someone stole my iPhone at MG Road Station. It was urgent."

Return JSON with: incident_type, location, urgency (HIGH/MEDIUM/LOW), description.`;

        const extractResult = await model.generateContent(extractionPrompt);
        const extractResponse = await extractResult.response;
        const extractText = extractResponse.text();

        console.log("\n📊 Extraction result:");
        console.log(extractText);

    } catch (error) {
        console.error("\n❌ FAILED!");
        console.error("Error:", error.message);
        if (error.status) console.error("Status:", error.status);
        if (error.statusText) console.error("Status Text:", error.statusText);
    }
}

testGemini25Flash();
