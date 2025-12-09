import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/db.js';

const router = express.Router();

// Get all bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      `SELECT b.*, 
       COALESCE(SUM(p.amount), 0) as total_paid
       FROM bookings b
       LEFT JOIN payments p ON b.id = p.booking_id
       GROUP BY b.id
       ORDER BY b.created_at DESC`
    );
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single booking
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      'SELECT * FROM bookings WHERE id = ?',
      [req.params.id]
    );
    
    if (bookings.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Get payments for this booking
    const [payments] = await pool.execute(
      'SELECT * FROM payments WHERE booking_id = ? ORDER BY created_at DESC',
      [req.params.id]
    );

    res.json({ ...bookings[0], payments });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create booking (public endpoint for contact form)
router.post('/', async (req, res) => {
  try {
    const { name, phone, preferred_date, preferred_time, style_description, status } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const [result] = await pool.execute(
      `INSERT INTO bookings (name, phone, preferred_date, preferred_time, style_description, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, phone, preferred_date || null, preferred_time || null, style_description || '', status || 'pending']
    );

    res.status(201).json({ id: result.insertId, message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update booking
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, phone, preferred_date, preferred_time, style_description, status, price } = req.body;

    await pool.execute(
      `UPDATE bookings 
       SET name = ?, phone = ?, preferred_date = ?, preferred_time = ?, 
           style_description = ?, status = ?, price = ?
       WHERE id = ?`,
      [name, phone, preferred_date, preferred_time, style_description, status, price, req.params.id]
    );

    res.json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete booking
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

