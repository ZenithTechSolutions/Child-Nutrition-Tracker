import express from "express";
import Food from "../models/Food.js";
import Attendance from "../models/Attendance.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Add Food
router.post("/add", auth, async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const { meals, students } = req.body;

    // 1️⃣ Check attendance exists
    const attendance = await Attendance.findOne({
      user: req.user.id,
      date: today,
    });

    if (!attendance) {
      return res.status(400).json({
        message: "Mark attendance first",
      });
    }

    // 2️⃣ Check food already submitted
    const existingFood = await Food.findOne({
      user: req.user.id,
      date: today,
    });

    if (existingFood) {
      return res.status(400).json({
        message: "Food already submitted for today",
      });
    }

    // 3️⃣ Only allow present students
    const presentStudents = attendance.records
      .filter((r) => r.status === "Present")
      .map((r) => r.student.toString());

    const filteredStudents = students.filter((s) =>
      presentStudents.includes(s.student),
    );

    // 4️⃣ Save food
    const food = await Food.create({
      user: req.user.id,
      date: today,
      meals,
      students: filteredStudents,
    });

    res.status(201).json({
      message: "Food tracking saved successfully",
      food,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Food already submitted for today",
      });
    }

    res.status(400).json({ message: err.message });
  }
});

// Get Food By Date
router.get("/by-date", auth, async (req, res) => {
  try {
    const { date } = req.query;

    const food = await Food.findOne({
      user: req.user.id,
      date,
    }).populate("students.student", "name");

    res.json(food);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
