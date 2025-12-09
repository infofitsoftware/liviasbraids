import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import pool from '../config/db.js';

const router = express.Router();

// Get all transactions
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [transactions] = await pool.execute(
      `SELECT t.*, b.name as customer_name
       FROM transactions t
       LEFT JOIN bookings b ON t.booking_id = b.id
       ORDER BY t.created_at DESC`
    );
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get transaction summary
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const [income] = await pool.execute(
      `SELECT COALESCE(SUM(amount), 0) as total 
       FROM transactions WHERE type = 'income'`
    );
    
    const [expense] = await pool.execute(
      `SELECT COALESCE(SUM(amount), 0) as total 
       FROM transactions WHERE type = 'expense'`
    );

    res.json({
      total_income: income[0].total,
      total_expense: expense[0].total,
      net_profit: income[0].total - expense[0].total
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create transaction (expense)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    if (!type || !amount || !description) {
      return res.status(400).json({ error: 'Type, amount, and description are required' });
    }

    const [result] = await pool.execute(
      `INSERT INTO transactions (type, amount, description)
       VALUES (?, ?, ?)`,
      [type, amount, description]
    );

    res.status(201).json({ id: result.insertId, message: 'Transaction recorded successfully' });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update transaction
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { type, amount, description } = req.body;

    await pool.execute(
      `UPDATE transactions 
       SET type = ?, amount = ?, description = ?
       WHERE id = ?`,
      [type, amount, description, req.params.id]
    );

    res.json({ message: 'Transaction updated successfully' });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete transaction
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute('DELETE FROM transactions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

