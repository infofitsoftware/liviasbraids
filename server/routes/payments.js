import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/db.js';

const router = express.Router();

// Get all payments
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [payments] = await pool.execute(
      `SELECT p.*, b.name as customer_name, b.phone as customer_phone
       FROM payments p
       LEFT JOIN bookings b ON p.booking_id = b.id
       ORDER BY p.created_at DESC`
    );
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get payments for a specific booking
router.get('/booking/:bookingId', authenticateToken, async (req, res) => {
  try {
    const [payments] = await pool.execute(
      'SELECT * FROM payments WHERE booking_id = ? ORDER BY created_at DESC',
      [req.params.bookingId]
    );
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create payment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { booking_id, amount, payment_method, notes } = req.body;

    if (!booking_id || !amount) {
      return res.status(400).json({ error: 'Booking ID and amount are required' });
    }

    const [result] = await pool.execute(
      `INSERT INTO payments (booking_id, amount, payment_method, notes)
       VALUES (?, ?, ?, ?)`,
      [booking_id, amount, payment_method || 'cash', notes || '']
    );

    // Create transaction record
    await pool.execute(
      `INSERT INTO transactions (type, amount, description, booking_id, payment_id)
       VALUES (?, ?, ?, ?, ?)`,
      ['income', amount, `Payment for booking #${booking_id}`, booking_id, result.insertId]
    );

    res.status(201).json({ id: result.insertId, message: 'Payment recorded successfully' });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update payment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { amount, payment_method, notes } = req.body;

    await pool.execute(
      `UPDATE payments 
       SET amount = ?, payment_method = ?, notes = ?
       WHERE id = ?`,
      [amount, payment_method, notes, req.params.id]
    );

    res.json({ message: 'Payment updated successfully' });
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete payment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM payments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

