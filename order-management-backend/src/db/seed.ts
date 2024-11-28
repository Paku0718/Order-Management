import { generateOrders } from '../utils/dataGenerator';
import { query } from '../config/database';

const seedDatabase = async () => {
  console.log('Starting database seeding...');
  console.log('Database credentials:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  const orders = generateOrders(10000);

  try {
    // Test connection first
    await query('SELECT NOW()');
    console.log('Database connection successful');

    // Rest of your seeding logic...
    await query('DELETE FROM orders');

    const insertQuery = `
      INSERT INTO orders (id, customer_name, order_amount, status, items, created_at) 
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    console.log(`Inserting ${orders.length} orders...`);

    // Use batch insert for performance
    for (const order of orders) {
      await query(insertQuery, [
        order.id, 
        order.customerName, 
        order.orderAmount, 
        order.status, 
        JSON.stringify(order.items), 
        order.createdAt
      ]);
    }

    console.log('Database seeded successfully with 10,000 orders');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed', error);
    process.exit(1);
  }
};

seedDatabase();