-- URLs table
CREATE TABLE IF NOT EXISTS urls (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  custom_slug BOOLEAN DEFAULT FALSE,
  clicks INTEGER DEFAULT 0
);

-- Analytics table
CREATE TABLE IF NOT EXISTS clicks (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR(10) NOT NULL,
  clicked_at TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(2),
  device_type VARCHAR(20)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_short_code ON urls(short_code);
CREATE INDEX IF NOT EXISTS idx_clicks_short_code ON clicks(short_code);