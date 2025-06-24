const express = require('express');
const multer = require('multer');
const Image = require('../models/Bills');
const router = express.Router();

// Store in memory since you save it in MongoDB
const storage = multer.memoryStorage();
const upload = multer({ storage });

//  Upload endpoint: allow only 1 per day
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingImage = await Image.findOne({
      uploadedAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (existingImage) {
      return res.status(403).json({ error: 'You can only upload one image per day.' });
    }

    const newImage = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      image: req.file.buffer,
    });

    await newImage.save();
    res.status(200).json({ message: 'Image uploaded!', id: newImage._id.toString() });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 View image by date (YYYY-MM-DD)
router.get('/by-date', async (req, res) => {
  const dateQuery = req.query.date;

  if (!dateQuery) {
    return res.status(400).json({ error: 'Please provide a date in YYYY-MM-DD format' });
  }

  try {
    const date = new Date(dateQuery);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const image = await Image.findOne({
      uploadedAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (!image) {
      return res.status(404).json({ error: 'No image found for that date' });
    }

    res.set('Content-Type', image.contentType);
    res.send(image.image);
  } catch (err) {
    res.status(500).json({ error: 'Server error or invalid date' });
  }
});

// 📌 Get today's image ID
router.get('/today', async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const image = await Image.findOne({
      uploadedAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (image) {
      return res.json({ imageId: image._id.toString() });
    }

    res.json({ imageId: null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Get image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', image.contentType);
    res.send(image.image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
  