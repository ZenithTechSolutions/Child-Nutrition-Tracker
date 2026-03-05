import express from "express";
import axios from "axios";
import Student from "../models/Student.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/update-measurements/:studentId", auth, async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findOne({
      _id: studentId,
      userId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const url = process.env.THING_SPEAK_URL;

    const response = await axios.get(url);
    const feeds = response.data.feeds;

    if (!feeds || feeds.length === 0) {
      return res.status(400).json({ message: "No sensor data found" });
    }
    
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const index = student.measurements.findIndex((m) => m.date === today);

    const oldHeight = student.measurements[index]?.height || 0;
    const oldWeight = student.measurements[index]?.weight || 0;

    const latest = feeds[0];

    const height = Number(latest.field1) || oldHeight;
    const weight = Number(latest.field2) || oldWeight;

    if (!student.measurements) {
      student.measurements = [];
    }

    const measurement = {
      height,
      weight,
      date: today,
    };

    if (index !== -1) {
      // Replace today's measurement
      student.measurements[index] = measurement;
    } else {
      // Add new measurement
      student.measurements.push(measurement);
    }

    await student.save();

    res.json(measurement);
  } catch (err) {
    console.error("Measurement error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/update-measurements/manual/:studentId",
  auth,
  async (req, res) => {
    try {
      const { studentId } = req.params;
      const { height, weight } = req.body;
      const student = await Student.findOne({
        _id: studentId,
        userId: req.user.id,
      });

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });

      if (!student.measurements) {
        student.measurements = [];
      }

      const index = student.measurements.findIndex((m) => m.date === today);
      
      const oldHeight = student.measurements[index]?.height || 0;
      const oldWeight = student.measurements[index]?.weight || 0;

      const measurement = {
        height : height ? height : oldHeight,
        weight: weight ? weight : oldWeight,
        date: today,
      };

      if (index !== -1) {
        // Replace today's measurement
        student.measurements[index] = measurement;
      } else {
        // Add new measurement
        student.measurements.push(measurement);
      }

      await student.save();

      res.json(measurement);
    } catch (err) {
      console.error("Measurement error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
