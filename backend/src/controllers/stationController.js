const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get All Stations
exports.getAllStations = async (req, res) => {
    try {
        const stations = await prisma.policeStation.findMany();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Station (Admin Only)
exports.createStation = async (req, res) => {
    const { station_name, location, jurisdiction_areas, contact_number } = req.body;

    // Check if user is admin (req.user.role from token)
    // Note: token role might be ADMIN or OFFICER. Check logic.
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access Denied: Admins Only' });
    }

    try {
        const station = await prisma.policeStation.create({
            data: {
                station_name,
                location,
                jurisdiction_areas,
                contact_number
            }
        });
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
