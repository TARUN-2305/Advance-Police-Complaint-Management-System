const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testAllModels() {
    const modelsToTry = [
        "gemini-pro",
        "gemini-1.0-pro",
        "gemini-1.5-pro",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-pro-vision"
    ];

    console.log("🧪 Testing Gemini API with different model names...\n");
    console.log(`API Key: ${process.env.GEMINI_API_KEY?.substring(0, 10)}...\n`);

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing: ${modelName}...`);
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent("Say hello in 3 words");
            const response = await result.response;
            const text = response.text();

            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log(`Response: ${text}\n`);
            break; // Stop if we find a working model

        } catch (error) {
            console.log(`❌ Failed: ${error.message}\n`);
        }
    }
}

testAllModels();
