const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student'); // Student routes
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Ensure this path exists
require('dotenv').config(); // Load environment variables

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
const whitelist = ['http://localhost:5174', 'https://insanedanzecompany.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use student routes
app.use('/api', studentRoutes);

// Import models
const Visited = require('./models/Visited');
const Slide = require('./models/Slide');
const Moment = require('./models/Moment');
const Activity = require('./models/Activity');
const Achievement = require('./models/Achievement');
const AcademicCentre = require('./models/AcademicCentre');
const Notice = require('./models/Notice');

// Routes for fetching collections
app.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find().sort({ index: 1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
});

app.get('/', async (req, res) => {
    res.send("All is well");
});

app.get('/api/achievements', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ index: 1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching achievements', error: error.message });
    }
});

app.get('/api/moments', async (req, res) => {
    try {
        const moments = await Moment.find().sort({ index: 1 });
        res.json(moments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching moments', error: error.message });
    }
});

app.get('/api/slides', async (req, res) => {
    try {
        const slides = await Slide.find().sort({ index: 1 });
        res.json(slides);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slides', error: error.message });
    }
});

app.get('/api/visited', async (req, res) => {
    try {
        const visited = await Visited.find().sort({ index: 1 });
        res.json(visited);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching visited', error: error.message });
    }
});

app.get('/api/academic-centres', async (req, res) => {
    try {
        const centres = await AcademicCentre.find();
        res.json(centres);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching academic centres', error: error.message });
    }
});

// GET all notices
app.get('/api/notices', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ position: 1 });
        res.json(notices);
    } catch (error) {
        console.error('Error fetching notices:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
