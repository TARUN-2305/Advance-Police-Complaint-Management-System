const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5001/api';

async function testVoiceAnalysis() {
    try {
        console.log("🎙️ Testing Voice Analysis with audio file...\n");

        // 1. Login as victim first
        console.log("1️⃣ Logging in...");
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@police.gov.in',
                password: 'password123',
                role: 'OFFICER'
            })
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed: ${loginRes.statusText}`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log("✅ Logged in\n");

        // 2. Upload audio file
        console.log("2️⃣ Uploading audio file...");
        const audioPath = path.join(__dirname, 'Title iPhone 15 Stol.mp3');

        if (!fs.existsSync(audioPath)) {
            throw new Error(`Audio file not found: ${audioPath}`);
        }

        const form = new FormData();
        form.append('audio', fs.createReadStream(audioPath), {
            filename: 'test_audio.mp3',
            contentType: 'audio/mpeg'
        });

        const analyzeRes = await fetch(`${BASE_URL}/voice/analyze`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                ...form.getHeaders()
            },
            body: form
        });

        console.log(`Response Status: ${analyzeRes.status} ${analyzeRes.statusText}`);

        const result = await analyzeRes.json();

        if (analyzeRes.ok) {
            console.log("\n✅ SUCCESS!\n");
            console.log("📝 Transcript:", result.transcript);
            console.log("\n🧠 Extracted Data:");
            console.log(JSON.stringify(result.data, null, 2));
        } else {
            console.log("\n❌ FAILED!\n");
            console.log("Error:", result.error || result);
        }

    } catch (error) {
        console.error("\n❌ Test Failed:", error.message);
        if (error.cause) console.error("Cause:", error.cause);
    }
}

testVoiceAnalysis();
