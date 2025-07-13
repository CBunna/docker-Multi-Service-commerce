const express = require('express');
const { pool } = require('../config/database');
const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    // Calculate total
    let total = 0;
    for (const item of items) {
      const product = await pool.query('SELECT price FROM products WHERE id = $1', [item.productId]);
      total += product.rows[0].price * item.quantity;
    }
    
    // Create order
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id',
      [userId, total]
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Add order items
    for (const item of items) {
      const product = await pool.query('SELECT price FROM products WHERE id = $1', [item.productId]);
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.productId, item.quantity, product.rows[0].price]
      );
    }
    
    res.status(201).json({ orderId, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;