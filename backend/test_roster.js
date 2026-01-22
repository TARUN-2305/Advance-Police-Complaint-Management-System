async function test() {
    try {
        console.log("1. Login Admin...");
        const loginRes = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@police.gov.in', password: 'password123', role: 'OFFICER' })
        });
        const loginData = await loginRes.json();

        if (!loginRes.ok) throw new Error(loginData.message || 'Login Failed');

        const { token, user } = loginData;
        console.log("   Success. Token obtained.");
        console.log(`   User: ${user.full_name}, Role: ${user.role}`);

        if (user.role !== 'ADMIN') {
            console.error("   CRITICAL: User is not ADMIN!");
            return;
        }

        console.log("2. Fetch Officers...");
        const rosterRes = await fetch('http://localhost:5001/api/auth/officers', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const rosterData = await rosterRes.json();

        if (!rosterRes.ok) {
            console.log("Status:", rosterRes.status);
            console.log("Body:", rosterData);
            throw new Error(rosterData.message || 'Fetch Failed');
        }

        console.log(`   Success. Count: ${rosterData.length}`);
        rosterData.forEach(o => console.log(`   - ${o.full_name} (${o.role})`));

    } catch (e) {
        console.error("FAILED:", e.message);
    }
}

test();
