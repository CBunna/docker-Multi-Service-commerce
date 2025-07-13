const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const initialize = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
    await createTables();
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      stock INTEGER DEFAULT 0,
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      total DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL
    )`
  ];

  for (const query of queries) {
    await pool.query(query);
  }
  
  // Insert sample products
  await pool.query(`
    INSERT INTO products (name, description, price, stock, image_url) 
    VALUES 
      ('Laptop', 'High-performance laptop', 999.99, 10, '/images/laptop.jpg'),
      ('Smartphone', 'Latest smartphone', 699.99, 25, '/images/phone.jpg'),
      ('Headphones', 'Wireless headphones', 199.99, 50, '/images/headphones.jpg')
    ON CONFLICT DO NOTHING
  `);
};

module.exports = { pool, initialize };