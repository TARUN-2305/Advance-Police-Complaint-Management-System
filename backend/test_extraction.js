const extractionService = require('./src/voice_module/extractionService');
require('dotenv').config();

async function testExtraction() {
    try {
        console.log("🧪 Testing Gemini Extraction Service\n");

        // Simulating a transcript from the user's "iPhone 15 Stolen" audio
        const testTranscript = `
            Yesterday around 5 PM, I was at MG Road near the metro station 
            when someone forcefully snatched my iPhone 15 from my hands. 
            It was a black iPhone 15, 256GB variant worth approximately 80,000 rupees. 
            The suspect was a male, around 25-30 years old, wearing a blue hoodie and jeans. 
            He ran towards the parking area and escaped on a motorcycle. 
            This is a very urgent matter as the phone contains important personal and work data.
        `;

        console.log("📝 Test Transcript:");
        console.log(testTranscript);
        console.log("\n🧠 Extracting complaint data...\n");

        const extractedData = await extractionService.extractComplaintData(testTranscript);

        console.log("✅ EXTRACTION RESULT:");
        console.log(JSON.stringify(extractedData, null, 2));

    } catch (error) {
        console.error("\n❌ Test Failed:", error.message);
        if (error.stack) console.error(error.stack);
    }
}

testExtraction();
