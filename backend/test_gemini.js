const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testGeminiAPI() {
    try {
        console.log("🧪 Testing Gemini API Connection...\n");

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY not found in environment");
        }

        console.log(`API Key: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        console.log("Sending test prompt...");
        const result = await model.generateContent("Say hello!");
        const response = await result.response;
        const text = response.text();

        console.log("\n✅ SUCCESS!");
        console.log("Response:", text);

    } catch (error) {
        console.error("\n❌ FAILED!");
        console.error("Error:", error.message);
        if (error.status) console.error("Status:", error.status);
        if (error.statusText) console.error("Status Text:", error.statusText);
    }
}

testGeminiAPI();
