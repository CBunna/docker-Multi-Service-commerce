-- This file is automatically executed when PostgreSQL container starts
-- Additional setup can be added here

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);