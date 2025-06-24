const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  image: Buffer,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bills', ImageSchema);
