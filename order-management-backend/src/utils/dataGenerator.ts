import { faker } from '@faker-js/faker';
import { Pool } from 'pg'; // Import Pool from pg
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new pool instance
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

interface Order {
  id: string;
  customerName: string;
  orderAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

export const generateOrders = (count: number): Order[] => {
  const orders: Order[] = [];

  for (let i = 0; i < count; i++) {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    const items = Array.from({ length: itemCount }, () => ({
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: parseFloat(faker.commerce.price()),
    }));

    const order: Order = {
      id: faker.string.uuid(),
      customerName: faker.person.fullName(),
      orderAmount: items.reduce((sum, item) => sum + item.quantity * item.price, 0),
      status: faker.helpers.arrayElement(['pending', 'processing', 'completed', 'cancelled']),
      items,
      createdAt: faker.date.recent({ days: 365 }).toISOString(),
    };

    orders.push(order);
  }

  return orders;
};

export const seedDatabase = async () => {
  const orders = generateOrders(10000);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const order of orders) {
      await client.query(
        `INSERT INTO orders (id, customer_name, order_amount, status, items, created_at) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          order.id, 
          order.customerName, 
          order.orderAmount, 
          order.status, 
          JSON.stringify(order.items), 
          order.createdAt
        ]
      );
    }

    await client.query('COMMIT');
    console.log('Database seeded successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed', error);
  } finally {
    client.release();
  }
};

// Automatically run seed if script is directly executed
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}