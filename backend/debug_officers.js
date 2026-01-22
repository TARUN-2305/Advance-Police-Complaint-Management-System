const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("--- DEBUG: Fetching Officers ---");
    const officers = await prisma.policeOfficer.findMany({
        include: { station: true }
    });

    console.log(`Total Count: ${officers.length}`);
    if (officers.length === 0) {
        console.log("No officers found in DB!");
    } else {
        officers.forEach(o => {
            console.log(`[${o.officer_id}] ${o.full_name} (${o.email}) | Role: ${o.role} | Active: ${o.is_active}`);
        });
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
