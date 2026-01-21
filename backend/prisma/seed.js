const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Start seeding...');

    // 1. Create Police Stations
    const stationsData = [
        { station_name: 'Kengeri Police Station', location: 'Kengeri', contact_number: '080-1001' },
        { station_name: 'Jayanagar Police Station', location: 'Jayanagar', contact_number: '080-1002' },
        { station_name: 'Indiranagar Police Station', location: 'Indiranagar', contact_number: '080-1003' },
        { station_name: 'Koramangala Police Station', location: 'Koramangala', contact_number: '080-1004' }
    ];

    const stations = [];
    for (const s of stationsData) {
        const existingStation = await prisma.policeStation.findFirst({ where: { station_name: s.station_name } });
        if (!existingStation) {
            stations.push(await prisma.policeStation.create({ data: s }));
        } else {
            stations.push(existingStation);
        }
    }
    console.log('✅ 4 Bangalore Stations created/verified');

    // 2. Create Officers for each Station
    const password = await bcrypt.hash('password123', 10);

    const officersData = [
        { name: 'Inspector Ramesh', badge: 'COP-KEN-01', email: 'ramesh@kengeri.com', stationId: stations[0].station_id },
        { name: 'Inspector Suresh', badge: 'COP-JAY-01', email: 'suresh@jayanagar.com', stationId: stations[1].station_id },
        { name: 'Inspector Anita', badge: 'COP-IND-01', email: 'anita@indiranagar.com', stationId: stations[2].station_id },
        { name: 'Inspector Deepa', badge: 'COP-KOR-01', email: 'deepa@koramangala.com', stationId: stations[3].station_id }
    ];

    for (const o of officersData) {
        const existing = await prisma.policeOfficer.findUnique({ where: { badge_number: o.badge } });
        if (!existing) {
            await prisma.policeOfficer.create({
                data: {
                    full_name: o.name,
                    badge_number: o.badge,
                    email: o.email,
                    password_hash: password,
                    rank: 'Inspector',
                    role: 'OFFICER',
                    is_active: true,
                    station_id: o.stationId
                }
            });
        }
    }

    // 3. Create Commissioner (Admin)
    const adminBadge = 'COP-ADMIN-001';
    if (!await prisma.policeOfficer.findUnique({ where: { badge_number: adminBadge } })) {
        await prisma.policeOfficer.create({
            data: {
                full_name: 'Commissioner Vikram',
                badge_number: adminBadge,
                email: 'admin@police.gov.in',
                password_hash: password,
                rank: 'Commissioner',
                role: 'ADMIN',
                is_active: true,
                station_id: stations[0].station_id // HQ logic ideally, but reusing Kengeri for now
            }
        });
        console.log('✅ Commissioner Admin created');
    }
    console.log('✅ Officers created for all stations');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
