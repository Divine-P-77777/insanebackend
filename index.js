const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Visited = require('./models/Visited');
const Slide = require('./models/Slide');
const Moment = require('./models/Moment');
const Activity = require('./models/Activity');
const Achievement = require('./models/Achievement');
const AcademicCentre = require('./models/AcademicCentre');
const Notice = require('./models/Notice');
const Student = require('./routes/student'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
const whitelist = ['http://localhost:5173', 'https://insanedanzecompany.vercel.app/'];
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

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use student routes for student registration

app.use('/api/student', Student);

// Routes for fetching collections
app.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find().sort({ index: 1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
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
        const notices = await Notice.find().sort({ position: 1 }); // Fetch notices sorted by position
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
