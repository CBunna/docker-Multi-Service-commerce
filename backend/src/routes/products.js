const express = require('express');
const { pool } = require('../config/database');
const redis = require('../config/redis');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    // Check cache first
    const cached = await redis.get('products:all');
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    
    // Cache for 5 minutes
    await redis.setEx('products:all', 300, JSON.stringify(result.rows));
    
    res.json(result.rows);

    console.log("Test Products",result)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;