import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/students.js";
import attendanceRoutes from "./routes/attendance.js";
import foodRoutes from "./routes/food.js";
import measurementRoutes from "./routes/measurement.js";
import billRoutes from "./routes/bills.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/food", foodRoutes);
app.use("/measurements", measurementRoutes);
app.use("/bills", billRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});

app.get("/", (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send(`
            <h1>Server is Started and Running</h1>
            <h1 style="color:green">Database connected successfully!!</h1>
        `);
  } else {
    res.send(`
            <h1>Server is Running</h1>
            <h1 style="color:red;">Database not connected! Check connection string</h1>
        `);
  }
});
