import express from 'express';
import { getOrders } from '../services/orderService';
import { validateOrderQuery } from '../utils/validation';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { cursor, limit, sort, sortDirection } = validateOrderQuery(req.query);
    // console.log('Validated parameters:', { cursor, limit, sort, sortDirection });

    const orders = await getOrders(
      cursor || null, 
      limit, 
      sort, 
      sortDirection
    );

    // console.log('Orders fetched:', orders.data.length);
    res.json(orders);
  } catch (error) {
    // console.error('Error in orders route:', error);
    next(error);
  }
});

export default router;