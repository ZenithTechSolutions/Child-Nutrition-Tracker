import express from "express";
import Student from "../models/Student.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ADD STUDENT
router.post("/", auth, async (req, res) => {
  try {
    const student = await Student.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET STUDENTS
router.get("/", auth, async (req, res) => {
  const students = await Student.find({ userId: req.user.id });
  res.json(students);
});

export default router;
