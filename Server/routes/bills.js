import express from "express";
import Bill from "../models/Bill.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Upload bill
router.post("/upload", auth, async (req, res) => {
  try {
    const { image, description } = req.body;

    if (!image) {
      return res.status(400).json({
        message: "Image required",
      });
    }

    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const bill = await Bill.create({
      userId: req.user.id,
      date: today,
      description,
      image,
    });

    res.json(bill);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Upload failed",
    });
  }
});

// Get all bills
router.get("/", auth, async (req, res) => {
  try {
    const bills = await Bill.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(bills);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bills",
    });
  }
});

// Delete bill
router.delete("/:id", auth, async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);

    res.json({
      message: "Bill deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
});

export default router;
