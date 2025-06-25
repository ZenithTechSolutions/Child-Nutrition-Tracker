import express from 'express';
import Student from '../models/Student.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all students
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.userId });
    res.status(200).json(students);
  } catch {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Add new student
router.post('/add-student', authMiddleware, async (req, res) => {
  const { name, dob, doj, age, height, weight, fathers_name, mothers_name, address, contact } = req.body;
  try {
    const student = new Student({
      name,
      doj,
      dob,
      age,
      fathers_name,
      mothers_name,
      address,
      contact,
      user: req.user.userId,
      measurements: [{ height, weight }]
    });
    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding student' });
  }
});

// Mark attendance
router.post('/mark-attendance/:studentId', authMiddleware, async (req, res) => {
  const { studentId } = req.params;
  const { present } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Create today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if attendance already marked today
    const alreadyMarked = student.attendance.some((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    // Save attendance with full timestamp
    student.attendance.push({ present, date: new Date() });
    await student.save();

    return res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update measurements
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
});

export default router;