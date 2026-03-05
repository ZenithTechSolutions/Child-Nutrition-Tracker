import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // format: YYYY-MM-DD
      required: true,
    },

    records: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

// Prevent duplicate attendance per user per date
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
