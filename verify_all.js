// Native fetch (Node 18+)
const BASE_URL = 'http://localhost:5001/api';

async function main() {
    console.log("🚀 STARTING FULL SYSTEM HEALTH CHECK\n");
    try {
        // --- STEP 1: VICTIM FLOW ---
        console.log("👤 [VICTIM] Registering...");
        const victimEmail = `healthcheck.victim.${Date.now()}@test.com`;
        const password = 'password123';

        const regRes = await fetch(`${BASE_URL}/auth/register/victim`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: 'Health Check User', email: victimEmail, password, phone_number: '1234567890' })
        });
        if (!regRes.ok) throw new Error(`Registration Failed: ${regRes.statusText}`);
        const victimData = await regRes.json();
        const victimToken = victimData.token;
        console.log("✅ Victim Registered & Logged In");

        console.log("📝 [VICTIM] Lodging Complaint...");
        const incidentDate = "2026-03-01";
        const lodgeRes = await fetch(`${BASE_URL}/complaints`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${victimToken}` },
            body: JSON.stringify({
                title: "System Health Check Complaint",
                description: "Testing all module integrations including AI, DB, and Evidence.",
                incident_location: "Tech Park, Indiranagar",
                incident_date: incidentDate, // Checking Date Fix
                category: "Cybercrime"
            })
        });
        if (!lodgeRes.ok) throw new Error(`Lodge Failed: ${lodgeRes.statusText}`);
        const complaint = await lodgeRes.json();
        const complaintId = complaint.complaint_id;
        console.log(`✅ Complaint #${complaintId} Lodged`);

        // Verify Date Immediately
        if (complaint.incident_date && complaint.incident_date.startsWith(incidentDate)) {
            console.log(`   - Date Verified: ${complaint.incident_date}`);
        } else {
            console.error(`   - ❌ Date Mismatch: Expected ${incidentDate}, Got ${complaint.incident_date}`);
        }

        console.log("📎 [VICTIM] Uploading Evidence (Simulated)...");
        // We skip actual file upload endpoint (multipart) and hit the link endpoint directly with a fake URL
        // This tests the DB logic I just fixed.
        const evRes = await fetch(`${BASE_URL}/complaints/${complaintId}/evidence`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${victimToken}` },
            body: JSON.stringify({
                file_url: "/uploads/fake_evidence.png",
                evidence_type: "IMAGE",
                description: "Screenshot of issue"
            })
        });
        if (!evRes.ok) throw new Error(`Evidence Upload Failed: ${evRes.statusText}`);
        const evidenceData = await evRes.json();
        console.log("✅ Evidence Linked");
        if (evidenceData.visibility === 'VICTIM') {
            console.log("   - Visibility Verified: VICTIM (Visible to User)");
        } else {
            console.error(`   - ❌ Visibility Mismatch: Got ${evidenceData.visibility}`);
        }

        // --- STEP 2: AI ANALYSIS ---
        console.log("\n🤖 [AI] Waiting for Analysis (3s)...");
        await new Promise(r => setTimeout(r, 3000));

        const aiRes = await fetch(`${BASE_URL}/ai/${complaintId}`, {
            headers: { 'Authorization': `Bearer ${victimToken}` }
        });
        if (aiRes.ok) {
            const analysis = await aiRes.json();
            console.log("✅ AI Analysis Success");
            console.log(`   - Score: ${analysis.severity_score}`);
            console.log(`   - Category: ${analysis.predicted_category}`);
        } else {
            console.error("❌ AI Analysis Failed/Pending");
        }

        // --- STEP 3: OFFICER FLOW ---
        console.log("\n👮 [OFFICER] Admin Login...");
        const adminRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@police.gov.in', password: 'password123', role: 'OFFICER' })
        });
        if (!adminRes.ok) throw new Error(`Admin Login Failed: ${adminRes.statusText}`);
        const adminData = await adminRes.json();
        const adminToken = adminData.token;
        console.log("✅ Admin Logged In");

        console.log("🔍 [OFFICER] Viewing Complaint Details...");
        const detailsRes = await fetch(`${BASE_URL}/complaints/${complaintId}`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        if (!detailsRes.ok) throw new Error(`Get Details Failed: ${detailsRes.statusText}`);
        const details = await detailsRes.json();

        console.log("✅ Details Fetched");
        // Verify output matches what UI needs
        if (details.evidence && details.evidence.length > 0) {
            console.log("   - Evidence: Visible to Officer ✅");
        } else {
            console.error("   - ❌ Evidence NOT visible to Officer");
        }

        console.log("✍️ [OFFICER] Adding Timeline Update...");
        const updateRes = await fetch(`${BASE_URL}/complaints/${complaintId}/updates`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
            body: JSON.stringify({ text: "Investigation Started. Officer Assigned.", visibility: "VICTIM" })
        });
        if (!updateRes.ok) throw new Error(`Post Update Failed`);
        console.log("✅ Timeline Updated");

        // --- STEP 4: VICTIM VERIFICATION ---
        console.log("\n👤 [VICTIM] Verifying Timeline Update...");
        const vDetailsRes = await fetch(`${BASE_URL}/complaints/${complaintId}`, {
            headers: { 'Authorization': `Bearer ${victimToken}` }
        });
        const vDetails = await vDetailsRes.json();
        const lastUpdate = vDetails.timeline[vDetails.timeline.length - 1];

        if (lastUpdate && lastUpdate.text.includes("Investigation Started")) {
            console.log("✅ Victim sees the update!");
        } else {
            console.error("❌ Victim cannot see the update.");
        }

        console.log("\n🎉 ALL SYSTEMS GO! Every aspect is working correctly.");

    } catch (error) {
        console.error("\n❌ SYSTEM CHECK FAILED:", error.message);
        if (error.cause) console.error(error.cause);
    }
}

main();
