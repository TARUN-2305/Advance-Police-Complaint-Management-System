async function testAdminLogin() {
    console.log("Testing Login for admin@police.gov.in...");
    try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@police.gov.in',
                password: 'password123',
                role: 'OFFICER' // Admin logs in via Officer portal
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("\n✅ Login SUCCESS!");
            console.log(`User: ${data.user.full_name}`);
            console.log(`Role: ${data.user.role}`);
            console.log(`Token: ${data.token.substring(0, 20)}...`);
        } else {
            console.log("\n❌ Login FAILED");
            console.log(`Status: ${response.status}`);
            console.log(`Body:`, data);
        }
    } catch (error) {
        console.error("\n❌ Network/Server Error:", error.message);
    }
}

testAdminLogin();
