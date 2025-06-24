import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  image: Buffer,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Bills = mongoose.model('Bills', ImageSchema);
export default Bills;
