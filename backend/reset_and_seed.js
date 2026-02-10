require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAndSeed() {
    console.log('🔄 Starting Database Reset & Seed...');

    // 1. Connect to MongoDB
    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Delete Collections
        const collections = ['internalnotes', 'caseupdates', 'evidencerecords'];
        for (const col of collections) {
            try {
                await mongoose.connection.collection(col).deleteMany({});
                console.log(`🗑️ Cleared MongoDB collection: ${col}`);
            } catch (e) {
                console.log(`⚠️ Could not clear ${col} (might not exist)`);
            }
        }
    }

    // 2. Delete Prisma Data (Order matters for FK)
    console.log('🗑️ Clearing PostgreSQL Data...');
    try {
        // await prisma.evidence.deleteMany({}); // Evidence is in Mongo
        await prisma.summon.deleteMany({});
        await prisma.complaintStatus.deleteMany({});
        // InternalNote is Mongo, but if defined in Prisma? No.

        // Remove 'shared_with' relations first?
        // Prisma handles many-to-many via join table. deleteMany on Complaint handles it?
        // Implicit m-n tables cascade delete usually.

        await prisma.complaint.deleteMany({}); // This should clear shared_with join table rows
        await prisma.victim.deleteMany({});
        await prisma.policeOfficer.deleteMany({});
        await prisma.policeStation.deleteMany({});
        console.log('✅ PostgreSQL Data Cleared');
    } catch (e) {
        console.error('❌ Error clearing SQL data:', e);
        process.exit(1);
    }

    // 3. Seed Stations
    console.log('🌱 Seeding Stations...');
    const stationsData = [
        {
            station_id: 1,
            station_name: 'Central Command Center',
            location: 'Shivajinagar',
            jurisdiction_areas: 'Shivajinagar, MG Road, Cubbon Park, Vidhana Soudha'
        },
        {
            station_id: 2,
            station_name: 'Indiranagar Police Station',
            location: 'Indiranagar',
            jurisdiction_areas: 'Indiranagar, Domlur, HAL, 100 Feet Road'
        },
        {
            station_id: 3,
            station_name: 'Kengeri Police Station',
            location: 'Kengeri',
            jurisdiction_areas: 'Kengeri, Mysore Road, Global Village, RR Nagar'
        },
        {
            station_id: 4,
            station_name: 'Koramangala Police Station',
            location: 'Koramangala',
            jurisdiction_areas: 'Koramangala, Sony Signal, Forum Mall, Ejipura'
        },
        {
            station_id: 5, // Jayanagar wasn't in seed_stations.js, check ID conflict with Whitefield?
            // seed_stations had Whitefield as 5.
            // I'll make Jayanagar 5.
            station_name: 'Jayanagar Police Station',
            location: 'Jayanagar',
            jurisdiction_areas: 'Jayanagar, South End Circle, Basavanagudi'
        }
    ];

    for (const s of stationsData) {
        await prisma.policeStation.create({ data: s });
    }
    console.log(`✅ Seeded ${stationsData.length} Stations`);

    // 4. Seed Officers
    console.log('👮 Seeding Officers...');
    const passwordHash = await bcrypt.hash('password123', 10);

    const officers = [
        // Admin
        {
            full_name: 'Commissioner Vikram',
            email: 'admin@police.gov.in',
            badge_number: 'COP-ADMIN-001',
            rank: 'Commissioner',
            role: 'ADMIN',
            station_id: 1,
            password_hash: passwordHash
        },
        // Inspectors
        {
            full_name: 'Inspector Ramesh',
            email: 'ramesh@kengeri.com',
            badge_number: 'COP-KEN-01',
            rank: 'Inspector',
            role: 'OFFICER',
            station_id: 3, // Kengeri
            password_hash: passwordHash
        },
        {
            full_name: 'Inspector Suresh',
            email: 'suresh@jayanagar.com',
            badge_number: 'COP-JAY-01',
            rank: 'Inspector',
            role: 'OFFICER',
            station_id: 5, // Jayanagar
            password_hash: passwordHash
        },
        {
            full_name: 'Inspector Anita',
            email: 'anita@indiranagar.com',
            badge_number: 'COP-IND-01',
            rank: 'Inspector',
            role: 'OFFICER',
            station_id: 2, // Indiranagar
            password_hash: passwordHash
        },
        {
            full_name: 'Inspector Deepa',
            email: 'deepa@koramangala.com',
            badge_number: 'COP-KOR-01',
            rank: 'Inspector',
            role: 'OFFICER',
            station_id: 4, // Koramangala
            password_hash: passwordHash
        }
    ];

    for (const o of officers) {
        await prisma.policeOfficer.create({ data: o });
    }
    console.log(`✅ Seeded ${officers.length} Officers`);

    console.log('✨ Database Reset & Seed Completed Successfully!');
}

resetAndSeed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await mongoose.disconnect();
    });
