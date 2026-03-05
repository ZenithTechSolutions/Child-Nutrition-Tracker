import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    doj: { type: Date, required: true },
    fathersName: String,
    mothersName: String,
    address: String,
    contact: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    measurements: [
      {
        height: Number,
        weight: Number,
        date: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Student", studentSchema);
