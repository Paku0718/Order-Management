import express from 'express';
import dotenv from 'dotenv';
import ordersRouter from './routes/orders';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/orders', ordersRouter);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});