import { z } from 'zod';

const OrderQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  sort: z.string().optional().default('created_at'),
  sortDirection: z.enum(['asc', 'desc']).optional().default('desc')
});

export const validateOrderQuery = (query: any) => {
  return OrderQuerySchema.parse(query);
};