const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log(req.body); // Log the request body
        const {
            studentName, institution, dob, parentName,
            address, whatsapp, phone, classes,
            healthIssues, healthDescription, academicCentre,
            passportPhoto,termsAccepted
        } = req.body;

        // Validate required fields
        if (!studentName || !passportPhoto ) {
            return res.status(400).send('Missing required fields: Student Name, Passport Photo, or Terms Accepted.');
        }

        // Create new student
        const newStudent = new Student({
            studentName, institution, dob, parentName,
            address, whatsapp, phone, classes,
            healthIssues, healthDescription, academicCentre,
            passportPhoto, termsAccepted // Include termsAccepted
        });

        // Save to MongoDB
        await newStudent.save();

        // Send success response
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error('Error registering student:', error);
        res.status(500).json({ error: 'Failed to register student. Please try again later.' });
    }
});


module.exports = router;
