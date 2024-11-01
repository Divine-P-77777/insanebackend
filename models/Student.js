const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    institution: String,
    dob: String,
    parentName: String,
    address: String,
    whatsapp: String,
    phone: String,
    classes: { type: [String], required: true }, // Change to an array of strings
    healthIssues: String,
    healthDescription: String,
    academicCentre: String,
    passportPhoto: { type: String, required: true },
    termsAccepted: { type: Boolean, required: false } // Ensure this is included in your model
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
