const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http'); // New
const { Server } = require('socket.io'); // New
const connectMongoDB = require('./db/mongo');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const stationRoutes = require('./routes/stationRoutes');
const tipRoutes = require('./routes/tipRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const helmet = require('helmet');
const { publicLimiter, loginLimiter } = require('./utils/rateLimiter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Init Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for prototype/dev. In prod, restrict to frontend domain.
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

io.on('connection', (socket) => {
    socket.on('join_room', (room) => {
        socket.join(room);
        // console.log(`Socket ${socket.id} joined ${room}`);
    });
});

app.set('io', io); // Make Accessible in Controllers

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rate Limiting
app.use('/api/auth/login', loginLimiter);
app.use('/api/tips', publicLimiter);
app.use('/api/complaints/public', publicLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Police Complaint System API is Running');
});

// Start Server
const startServer = async () => {
    await connectMongoDB();
    // Use server.listen instead of app.listen for Socket.io
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();
