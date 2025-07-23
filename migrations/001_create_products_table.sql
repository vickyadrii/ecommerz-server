CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  thumbnail_url TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  description TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
