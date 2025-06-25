import express from 'express';
import multer from 'multer';
import Image from '../models/Bills.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
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

// View image by date
router.get('/by-date', authMiddleware, async (req, res) => {
  const dateQuery = req.query.date;

  if (!dateQuery) {
    return res.status(400).json({ error: 'Please provide a date in YYYY-MM-DD format' });
  }

  try {
    const baseDate = new Date(dateQuery);
    const startOfDay = new Date(baseDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(baseDate);
    endOfDay.setHours(23, 59, 59, 999);

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

// Get today's image ID
router.get('/today', authMiddleware, async (req, res) => {
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

// Get image by ID
router.get('/:id', authMiddleware, async (req, res) => {
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

export default router;