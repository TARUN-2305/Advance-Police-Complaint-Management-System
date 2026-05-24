async function testVoiceFeature() {
    try {
        console.log("🧪 Testing Voice Extract Endpoint\n");

        // Sample complaint transcript
        const transcript = "Yesterday evening someone stole my iPhone 15 at MG Road. The suspect was a male wearing a blue hoodie. This is very urgent!";

        console.log("📝 Transcript:", transcript);
        console.log("\n🌐 Sending to /api/voice/extract...\n");

        const response = await fetch('http://localhost:5001/api/voice/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ transcript })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("✅ SUCCESS!\n");
            console.log("📊 Extracted Data:");
            console.log(JSON.stringify(data.data, null, 2));
        } else {
            console.log("❌ FAILED:");
            console.log(data);
        }

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testVoiceFeature();
