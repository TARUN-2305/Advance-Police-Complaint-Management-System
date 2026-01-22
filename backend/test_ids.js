const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testIds() {
    console.log("Creating 2 complaints to verify Auto-Increment...");

    // We need a victim first
    // Check if any victim exists, else create one
    let victim = await prisma.victim.findFirst();
    if (!victim) {
        victim = await prisma.victim.create({
            data: {
                full_name: "Test Victim",
                email: "testinc@example.com",
                password_hash: "hashed",
                address: "Test Addr"
            }
        });
    }

    const c1 = await prisma.complaint.create({
        data: {
            victim_id: victim.victim_id,
            title: "Test 1",
            description: "Desc 1",
            station_id: 1, // Assumes station 1 exists (Seed created it)
            current_status: 'PENDING'
        }
    });

    const c2 = await prisma.complaint.create({
        data: {
            victim_id: victim.victim_id,
            title: "Test 2",
            description: "Desc 2",
            station_id: 1,
            current_status: 'PENDING'
        }
    });

    console.log(`Complaint A ID: ${c1.complaint_id}`);
    console.log(`Complaint B ID: ${c2.complaint_id}`);

    if (c2.complaint_id > c1.complaint_id) {
        console.log("✅ Auto-Increment is WORKING correctly.");
    } else {
        console.log("❌ CRITICAL: IDs are colliding!");
    }
}

testIds()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
