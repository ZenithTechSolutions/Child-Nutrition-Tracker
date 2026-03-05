import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, number, password, state, district, taluk } = req.body;

    const existingUser = await User.findOne({ number });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      number,
      password: hashedPassword,
      state,
      district,
      taluk,
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { number, password } = req.body;

    const user = await User.findOne({ number });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid MPIN" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET LOGGED IN USER
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

export default router;
