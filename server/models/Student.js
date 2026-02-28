import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  dob: Date,
  doj: Date,
  age: Number,
  fathersName: String,
  mothersName: String,
  address: String,
  contact: String,
  measurements: [
    {
      date: { type: Date, default: Date.now },
      height: Number,
      weight: Number,
    },
  ],
  attendance: [
    {
      date: { type: Date, default: Date.now },
      present: Boolean,
    },
  ],
});

export default model('Student', studentSchema);
