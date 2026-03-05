import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  state: String,
  district: String,
  taluk: String,
});

export default mongoose.model("User", userSchema);
