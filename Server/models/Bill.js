import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    description: String,

    image: {
      type: String, // base64 image string
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Bill", billSchema);
