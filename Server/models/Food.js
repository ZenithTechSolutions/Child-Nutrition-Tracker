import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    meals: {
      breakfast: { type: String, required: true },
      lunch: { type: String, required: true },
      snacks: { type: String, required: true },
    },

    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        breakfast: { type: Boolean, required: true },
        lunch: { type: Boolean, required: true },
        snacks: { type: Boolean, required: true },
      },
    ],
  },
  { timestamps: true },
);

// Prevent duplicate food entry per user per day
foodSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("Food", foodSchema);
