import axios from 'axios';
import { OrdersResponse } from '../types/order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const fetchOrders = async ({ 
  pageParam = null, 
  limit = 50, 
  sort = 'created_at', 
  sortDirection = 'desc' 
}: {
  pageParam?: string | null;
  limit?: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
}) => {
  try {
    const response = await axios.get<OrdersResponse>(`${API_BASE_URL}/orders`, {
      params: {
        cursor: pageParam,
        limit,
        sort,
        sortDirection
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};