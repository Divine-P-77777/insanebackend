const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
    url: { type: String, required: true },
    index: { type: Number, required: true, default: 0 },  // Manage order
});

const Slide = mongoose.model('Slide', slideSchema);
module.exports = Slide;
