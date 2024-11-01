const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup with additional logging
const corsOptions = {
    origin: [process.env.CORS_ORIGIN, 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send("All is well");
});

app.get('/api/achievements', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ index: 1 });
        res.json(achievements);
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ message: 'Error fetching achievements', error: error.message });
    }
});

app.get('/api/moments', async (req, res) => {
    try {
        const moments = await Moment.find().sort({ index: 1 });
        res.json(moments);
    } catch (error) {
        console.error('Error fetching moments:', error);
        res.status(500).json({ message: 'Error fetching moments', error: error.message });
    }
});

app.get('/api/slides', async (req, res) => {
    try {
        const slides = await Slide.find().sort({ index: 1 });
        res.json(slides);
    } catch (error) {
        console.error('Error fetching slides:', error);
        res.status(500).json({ message: 'Error fetching slides', error: error.message });
    }
});

app.get('/api/visited', async (req, res) => {
    try {
        const visited = await Visited.find().sort({ index: 1 });
        res.json(visited);
    } catch (error) {
        console.error('Error fetching visited:', error);
        res.status(500).json({ message: 'Error fetching visited', error: error.message });
    }
});

app.get('/api/academic-centres', async (req, res) => {
    try {
        const centres = await AcademicCentre.find();
        res.json(centres);
    } catch (error) {
        console.error('Error fetching academic centres:', error);
        res.status(500).json({ message: 'Error fetching academic centres', error: error.message });
    }
});

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
