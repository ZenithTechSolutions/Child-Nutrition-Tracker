const express = require('express')
const router = express.Router()
const Student = require('../models/Student')
const authMiddleware = require('../middleware/authMiddleware')

//Get all students
router.get('/all', auth, async (req, res) => {
    try {
        const students = await Student.find({ user: req.user.userId });
        res.status(200).json(students);
    } catch {
        res.status(500).json({ message: 'Error fetching students' });
    }
})

//Add new student
router.post('/add-student', authMiddleware, async (req, res) => {
    const { name, dob, doj, age, height, weight, fathers_name, mothers_name, address, contact } = req.body;
    try {
        const student = new Student({
            name, doj, dob, age, fathers_name, mothers_name, address, contact,
            user: req.user.userId,
            measurements: [{ height, weight }]
        });
        await student.save();
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding student' });
    }
})

//Mark attendance
router.post('/mark-attendance/:studentId', authMiddleware, async (req, res) => {
    const { studentId } = req.params;
    const { present } = req.body;
    try {
        const student = await Student.findById(studentId);
        student.attendance.push({ present });
        await student.save();
        res.status(200).json({ message: 'Attendance marked' });
    } catch (err) {
        res.status(500).json({ message: 'Error marking attendance' });
    }
})

//Update measurements
router.post('/update-measurements/:studentId', authMiddleware, async (req, res) => {
    const { studentId } = req.params;
    const { weight, height } = req.body;
    try {
        const student = await Student.findById(studentId);
        student.measurements.push({ weight, height });
        await student.save();
        res.status(200).json({ message: 'Measurements updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating measurements' });
    }
})

module.exports = router