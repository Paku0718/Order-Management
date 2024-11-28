import express from 'express';
import { getOrders } from '../services/orderService';
import { validateOrderQuery } from '../utils/validation';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { cursor, limit, sort, sortDirection } = validateOrderQuery(req.query);

    const orders = await getOrders(
      cursor || null, 
      limit, 
      sort, 
      sortDirection
    );

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

export default router;