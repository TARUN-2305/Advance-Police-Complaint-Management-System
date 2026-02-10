const extractionService = require('./src/voice_module/extractionService');

const testTranscript = `
Yesterday around 5 PM, I was at MG Road near the metro station 
when someone forcefully snatched my iPhone 15 from my hands. 
It was a black iPhone 15, 256GB variant worth approximately 80,000 rupees. 
The suspect was a male, around 25-30 years old, wearing a blue hoodie and jeans. 
He ran towards the parking area and escaped on a motorcycle. 
This is a very urgent matter as the phone contains important personal and work data.
`;

console.log("✨ Testing Pattern-Based Extraction (No API needed!)\n");
console.log("📝 Test Transcript:");
console.log(testTranscript);
console.log("\n🧠 Extracting...\n");

extractionService.extractComplaintData(testTranscript)
    .then(data => {
        console.log("✅ SUCCESS! Extracted Data:");
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(err => {
        console.error("❌ Failed:", err);
    });
