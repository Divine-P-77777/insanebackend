const mongoose = require('mongoose');

// Define the Notice Schema
const NoticeSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
        unique: true, // Enforce unique constraint on position
    },
}, { timestamps: true });

// Create the Notice model
const Notice = mongoose.model('Notice', NoticeSchema);


module.exports = Notice;
