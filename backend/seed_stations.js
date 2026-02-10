const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedStations() {
    console.log('🌱 Seeding Police Stations with Jurisdictions...');

    const stations = [
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
            station_id: 5,
            station_name: 'Whitefield Police Station',
            location: 'Whitefield',
            jurisdiction_areas: 'Whitefield, ITPL, Hope Farm, Kadugodi'
        }
    ];

    for (const station of stations) {
        await prisma.policeStation.upsert({
            where: { station_id: station.station_id },
            update: { jurisdiction_areas: station.jurisdiction_areas },
            create: station
        });
        console.log(`✅ Upserted: ${station.station_name}`);
    }

    console.log('✨ Seeding Completed!');
}

seedStations()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
