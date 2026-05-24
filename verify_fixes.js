// Native fetch used


const BASE_URL = 'http://localhost:5001/api';

async function main() {
    try {
        console.log("🚀 Starting Verification Script...");

        // 1. Register a new Test Victim
        const email = `test.victim.${Date.now()}@example.com`;
        const password = 'password123';
        console.log(`\n1️⃣ Registering User: ${email}`);

        const regRes = await fetch(`${BASE_URL}/auth/register/victim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: 'Test Victim',
                email: email,
                password: password,
                phone_number: '9999999999'
            })
        });

        if (!regRes.ok) throw new Error(`Registration Failed: ${regRes.statusText}`);
        const regData = await regRes.json();
        const token = regData.token;
        console.log("✅ Registration Successful. Token received.");

        // 2. Lodge a Complaint WITH DATE
        console.log("\n2️⃣ Lodging Complaint with Incident Date...");
        const incidentDate = "2026-02-15"; // Future date or today
        const complaintPayload = {
            title: "Test Complaint for AI & Date Fix",
            description: "I was walking near the park when someone snatched my bag and ran away. It happened very quickly.",
            incident_location: "Kengeri Park",
            incident_date: incidentDate,
            category: "Theft"
        };

        const lodgeRes = await fetch(`${BASE_URL}/complaints`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(complaintPayload)
        });

        if (!lodgeRes.ok) throw new Error(`Lodge Complaint Failed: ${lodgeRes.statusText}`);
        const complaint = await lodgeRes.json();
        const complaintId = complaint.complaint_id;
        console.log(`✅ Complaint #${complaintId} Lodged.`);

        // 3. Verify Date is Saved
        console.log(`\n3️⃣ Verifying Incident Date for #${complaintId}...`);
        // We can just check the response from lodge, but let's fetch strictly to be sure
        const getRes = await fetch(`${BASE_URL}/complaints/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const myComplaints = await getRes.json();
        const savedComplaint = myComplaints.find(c => c.complaint_id === complaintId);

        if (savedComplaint.incident_date && savedComplaint.incident_date.startsWith(incidentDate)) {
            console.log(`✅ Incident Date Verified: ${savedComplaint.incident_date}`);
        } else {
            console.error(`❌ Incident Date Mismatch! Expected ${incidentDate}, got ${savedComplaint.incident_date}`);
        }

        // 4. Verify AI Analysis (Wait for async)
        console.log(`\n4️⃣ Waiting for AI Analysis (2s)...`);
        await new Promise(r => setTimeout(r, 2000));

        const aiRes = await fetch(`${BASE_URL}/ai/${complaintId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (aiRes.ok) {
            const analysis = await aiRes.json();
            console.log("✅ AI Analysis Retrieved Successfully!");
            console.log(`   - Severity: ${analysis.severity_score}`);
            console.log(`   - Urgency: ${analysis.urgency_level}`);
            console.log(`   - Category: ${analysis.predicted_category}`);
            console.log(`   - Explanation: ${analysis.explanation}`);
        } else {
            console.error(`❌ AI Analysis Failed: ${aiRes.status} ${aiRes.statusText}`);
            const errText = await aiRes.text();
            console.error("   Response:", errText);
        }

    } catch (error) {
        console.error("❌ Verification Failed:", error.message);
    }
}

main();
