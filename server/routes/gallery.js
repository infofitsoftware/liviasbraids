import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/db.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'gallery-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const [images] = await pool.execute(
      'SELECT * FROM gallery_images ORDER BY display_order ASC, created_at DESC'
    );
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload new image (admin only)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    
    const [result] = await pool.execute(
      'INSERT INTO gallery_images (image_path, display_order) VALUES (?, ?)',
      [imagePath, 0]
    );

    res.status(201).json({
      id: result.insertId,
      image_path: imagePath,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update gallery image order
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { display_order } = req.body;
    
    await pool.execute(
      'UPDATE gallery_images SET display_order = ? WHERE id = ?',
      [display_order, req.params.id]
    );

    res.json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete gallery image (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Get image path
    const [images] = await pool.execute(
      'SELECT image_path FROM gallery_images WHERE id = ?',
      [req.params.id]
    );

    if (images.length === 0) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete file from filesystem
    const imagePath = path.join(__dirname, '../../public', images[0].image_path);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete from database
    await pool.execute('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

