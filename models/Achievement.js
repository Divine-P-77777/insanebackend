const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    date: { type: String, required: true },
    description: { type: [String], required: true },
    media: { type: String, required: true },
    mediaType: { type: String, required: true },
    index: { type: Number, required: true, default: 0 },
    youtubeLink: { type: String }, // Optional YouTube link field
      // Manage order
});

const Achievement = mongoose.model('Achievement', achievementSchema);
module.exports = Achievement;
