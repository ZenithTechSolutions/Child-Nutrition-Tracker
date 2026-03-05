import express from "express";
import Attendance from "../models/Attendance.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ➕ Add Attendance
router.post("/add", auth, async (req, res) => {
  try {
    const { date, records } = req.body;

    const formattedRecords = Object.entries(records).map(
      ([studentId, status]) => ({
        student: studentId,
        status,
      }),
    );

    const attendance = await Attendance.create({
      user: req.user.id,
      date,
      records: formattedRecords,
    });

    res.status(201).json({
      message: "Attendance saved successfully",
      attendance,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Attendance already marked",
      });
    }

    res.status(400).json({ message: err.message });
  }
});

// 📅 Get Attendance By Date
router.get("/by-date", auth, async (req, res) => {
  try {
    const { date } = req.query;

    const attendance = await Attendance.findOne({
      user: req.user.id,
      date,
    }).populate("records.student", "name");

    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
