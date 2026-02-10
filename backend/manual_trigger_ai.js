const { PrismaClient } = require('@prisma/client');
const AIService = require('./src/ai_module');

const prisma = new PrismaClient();

async function main() {
    const id = process.argv[2];
    if (!id) {
        console.error("Usage: node manual_trigger_ai.js <completed_id>");
        process.exit(1);
    }

    console.log(`🔍 Fetching Complaint #${id}...`);
    const complaint = await prisma.complaint.findUnique({
        where: { complaint_id: parseInt(id) }
    });

    if (!complaint) {
        console.error(`❌ Complaint #${id} not found in Main DB.`);
        process.exit(1);
    }

    console.log(`⚡ Triggering AI Analysis for: "${complaint.title}"`);
    console.log(`   (This runs asynchronously, waiting a moment...)`);

    // We await it here directly to ensure it finishes before script exit
    // Note: triggerAnalysis is async but usually fire-and-forget in controller.
    // Here we want to wait for the inner process if possible, but the service method 
    // uses setImmediate if wrapped? No, in index.js it is async.
    // Let's call the logic directly or ensure we wait.

    // Actually AIService.triggerAnalysis IS async.
    await AIService.triggerAnalysis(complaint.complaint_id, complaint.description + " " + complaint.title);

    console.log("✅ Analysis Request Sent. Check UI.");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
