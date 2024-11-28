CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  order_amount NUMERIC(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_orders_created_at ON orders (created_at);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_order_amount ON orders (order_amount);