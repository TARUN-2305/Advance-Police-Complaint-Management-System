async function testSmartRouting() {
    try {
        console.log("🧪 Testing Smart Routing & Severity Scoring\n");

        // Case 1: Indiranagar Incident (Should route to Station 2)
        const transcript1 = "I was attacked near Indiranagar Metro Station yesterday night. It was very violent.";
        console.log(`📝 Case 1: "${transcript1}"`);

        const response1 = await fetch('http://localhost:5001/api/voice/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript: transcript1 })
        });
        const data1 = await response1.json();
        console.log("📊 Extraction 1:", JSON.stringify(data1.data, null, 2));

        // Note: The routing happens in /complaints endpoint, not /extract. 
        // But /extract confirms if location is captured correctly.

        console.log("\n--------------------------------------------------\n");

        // Case 2: Kengeri Incident (Should route to Station 3)
        const transcript2 = "My bike was stolen from Global Village Tech Park in Kengeri. Urgent help needed.";
        console.log(`📝 Case 2: "${transcript2}"`);

        const response2 = await fetch('http://localhost:5001/api/voice/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transcript: transcript2 })
        });
        const data2 = await response2.json();
        console.log("📊 Extraction 2:", JSON.stringify(data2.data, null, 2));

    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

testSmartRouting();
