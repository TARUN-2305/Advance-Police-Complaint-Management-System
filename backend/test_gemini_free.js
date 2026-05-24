const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testGeminiFree() {
    try {
        console.log("🧪 Testing Gemini Free Tier API\n");

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY not found in .env");
        }

        console.log(`API Key: ${process.env.GEMINI_API_KEY.substring(0, 15)}...`);
        console.log(`Key Length: ${process.env.GEMINI_API_KEY.length}\n`);

        // Initialize with API key
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try gemini-1.5-flash (free tier model)
        console.log("Testing model: gemini-1.5-flash");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log("Sending test prompt...");
        const result = await model.generateContent("Hello! Just say 'Hi' back.");
        const response = await result.response;
        const text = response.text();

        console.log("\n✅ SUCCESS!");
        console.log("Response:", text);

        // Now test with extraction
        console.log("\n🧪 Testing complaint extraction...");
        const extractionPrompt = `Extract JSON from: "Yesterday someone stole my phone at MG Road"
Return only: {"incident_type":"Theft","location":"MG Road","urgency":"HIGH"}`;

        const extractResult = await model.generateContent(extractionPrompt);
        const extractResponse = await extractResult.response;
        const extractText = extractResponse.text();

        console.log("Extraction result:");
        console.log(extractText);

    } catch (error) {
        console.error("\n❌ FAILED!");
        console.error("Error:", error.message);
        if (error.status) console.error("Status:", error.status);
        if (error.statusText) console.error("Status Text:", error.statusText);
        if (error.errorDetails) console.error("Details:", error.errorDetails);
    }
}

testGeminiFree();
