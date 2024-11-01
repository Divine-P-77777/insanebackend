const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    institution: { type: String, required: true },
    dob: { type: String, required: true },
    parentName: { type: String, required: true },
    address: { type: String, required: true },
    whatsapp: { type: String, required: true },
    phone: { type: String, required: true },
    healthIssues: { type: String, required: false },
    healthDescription: { type: String, required: false },
    academicCentre: { type: String, required: true },
    passportPhoto: { type: String, required: true },
    classes: { type: String, required: true },  // Newly added field
    termsAccepted: { type: Boolean, required: true },  // User consent validation
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
