import { query } from '../config/database';
import { createCursorPaginationQuery, encodeCursor } from '../utils/cursorPagination';

export const getOrders = async (
  cursor: string | null, 
  limit = 50, 
  sortField = 'created_at', 
  sortDirection: 'asc' | 'desc' = 'desc'
) => {
  const baseQuery = 'SELECT * FROM orders WHERE 1=1';
  
  const { query: paginatedQuery, values } = createCursorPaginationQuery(
    baseQuery, 
    cursor, 
    limit, 
    sortField, 
    sortDirection
  );

  const result = await query(paginatedQuery, values);
  const totalCountResult = await query('SELECT COUNT(*) FROM orders');

  const orders = result.rows;
  const totalCount = parseInt(totalCountResult.rows[0].count);

  // Create next cursor if there are more results
  const nextCursor = orders.length === limit 
    ? encodeCursor({
        [sortField]: orders[orders.length - 1][sortField],
        id: orders[orders.length - 1].id
      }) 
    : null;

  return {
    data: orders,
    nextCursor,
    totalCount
  };
};