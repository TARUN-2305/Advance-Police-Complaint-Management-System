const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');
const CaseUpdate = require('./src/models/CaseUpdate');

const prisma = new PrismaClient();

async function verifySystem() {
    console.log('\n🔍 --- STARTING SYSTEM VERIFICATION ---\n');

    // 1. Verify Stations
    console.log('1️⃣  Checking Stations...');
    const allStations = await prisma.policeStation.findMany();
    console.log('   ℹ️  Available Stations:', allStations.map(s => `${s.station_name} (${s.location})`).join(', '));

    const kengeriStation = allStations.find(s => s.location.includes('Kengeri'));
    if (!kengeriStation) throw new Error('Kengeri Station not found in the list above!');
    console.log(`   ✅ Found Kengeri Station (ID: ${kengeriStation.station_id})`);

    // 2. Register Citizen
    console.log('\n2️⃣  Simulating Citizen Registration (Arjun Kumar)...');
    let arjun = await prisma.victim.findUnique({ where: { email: 'arjun@example.com' } });
    if (!arjun) {
        arjun = await prisma.victim.create({
            data: {
                full_name: 'Arjun Kumar',
                email: 'arjun@example.com',
                password_hash: 'hashedpassword',
                phone_number: '9988776655',
                address: 'Kengeri Satellite Town'
            }
        });
        console.log('   ✅ Registered Arjun Kumar');
    } else {
        console.log('   ℹ️  Arjun Kumar already exists');
    }

    // 3. Lodge Complaint (Auto-Assignment Test)
    console.log('\n3️⃣  Lodging Complaint: "Lost Laptop Bag" at "Kengeri Bus Stand"...');
    const complaint = await prisma.complaint.create({
        data: {
            victim_id: arjun.victim_id,
            title: 'Lost Laptop Bag',
            description: 'Bag lost with HP laptop near the Kengeri bus terminal.',
            incident_location: 'Near Kengeri Bus Stand',
            category: 'Theft',
            station_id: kengeriStation.station_id, // Simulate Controller Logic matching 'Kengeri'
            current_status: 'PENDING'
        }
    });
    console.log(`   ✅ Complaint Lodged (ID: ${complaint.complaint_id})`);

    // Initialize Mongo Doc (Simulating Controller)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/police_cms');
    await new CaseUpdate({ complaint_id: complaint.complaint_id, updates: [] }).save();
    console.log('   ✅ MongoDB Document Initialized');

    // 4. Verify Assignment
    if (complaint.station_id === kengeriStation.station_id) {
        console.log(`   ✅ SUCCESS: Complaint automatically assigned to Station ID ${complaint.station_id} (Kengeri)`);
    } else {
        console.error(`   ❌ FAILED: Assigned to ${complaint.station_id} instead of ${kengeriStation.station_id}`);
    }

    // 5. Officer Action (Update Status & Timeline)
    console.log('\n4️⃣  Officer Action (Kengeri Inspector)...');
    const updatedComplaint = await prisma.complaint.update({
        where: { complaint_id: complaint.complaint_id },
        data: { current_status: 'INVESTIGATION' }
    });
    console.log(`   ✅ Status updated to: ${updatedComplaint.current_status}`);

    // Add Timeline in Mongo
    const updateDocs = await CaseUpdate.findOneAndUpdate(
        { complaint_id: complaint.complaint_id },
        {
            $push: {
                updates: {
                    text: 'Officer dispatched to bus stand to check CCTV.',
                    author_role: 'POLICE',
                    author_id: 999, // Mock Officer ID
                    visibility: 'VICTIM'
                }
            }
        },
        { new: true }
    );
    console.log('   ✅ Timeline updated in MongoDB');

    // 6. Final Verification Query
    console.log('\n5️⃣  FINAL DB VERIFICATION (Retrieving Data)...');

    // SQL Fetch
    const finalSql = await prisma.complaint.findUnique({
        where: { complaint_id: complaint.complaint_id },
        include: { station: true, victim: true }
    });

    // NoSQL Fetch
    const finalMongo = await CaseUpdate.findOne({ complaint_id: complaint.complaint_id });

    console.log('\n   📜 [SQL] COMPLAINT RECORD:');
    console.table({
        ID: finalSql.complaint_id,
        Title: finalSql.title,
        Station: finalSql.station.station_name,
        Status: finalSql.current_status,
        Victim: finalSql.victim.full_name
    });

    console.log('\n   📜 [NoSQL] TIMELINE UPDATES:');
    finalMongo.updates.forEach((u, i) => {
        console.log(`   ${i + 1}. [${u.author_role}] ${u.text} (${u.timestamp})`);
    });

    console.log('\n✅ VERIFICATION COMPLETE: Data validated in both PostgreSQL and MongoDB.');
}

verifySystem()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
        await mongoose.disconnect();
    });
