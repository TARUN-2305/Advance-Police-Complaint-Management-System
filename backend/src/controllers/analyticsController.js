const { PrismaClient } = require('@prisma/client');
const AnonymousTip = require('../models/AnonymousTip');

const prisma = new PrismaClient();

exports.getDashboardStats = async (req, res) => {
    // Admin only
    if (req.user.role !== 'ADMIN') return res.status(403).json({ message: 'Access denied' });

    try {
        const total = await prisma.complaint.count();
        const closed = await prisma.complaint.count({ where: { current_status: 'CLOSED' } });
        const pending = await prisma.complaint.count({ where: { current_status: 'PENDING' } });

        // Group by Station (Prisma GroupBy)
        const byStation = await prisma.complaint.groupBy({
            by: ['station_id'],
            _count: { complaint_id: true }
        });

        // Enrich station names
        const stations = await prisma.policeStation.findMany();
        const stationStats = byStation.map(s => {
            const st = stations.find(x => x.station_id === s.station_id);
            return { name: st ? st.station_name : 'Unknown', count: s._count.complaint_id };
        });

        // Recent Tips (Mongo)
        const tips = await AnonymousTip.find().sort({ created_at: -1 }).limit(5);

        res.json({
            overview: { total, closed, pending },
            stationStats,
            recentTips: tips
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
