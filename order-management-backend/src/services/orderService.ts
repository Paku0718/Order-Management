import { query } from '../config/database';
import { createCursorPaginationQuery, encodeCursor } from '../utils/cursorPagination';

export const getOrders = async (
  cursor: string | null, 
  limit = 50, 
  sortField = 'created_at', // Change to snake_case
  sortDirection: 'asc' | 'desc' = 'desc'
) => {
  // Map camelCase frontend fields to snake_case database columns
  const columnMapping: { [key: string]: string } = {
    createdAt: 'created_at',
    customerName: 'customer_name',
    orderAmount: 'order_amount'
  };

  // Convert sort field to snake_case if it exists in mapping
  const dbSortField = columnMapping[sortField] || sortField;

  const baseQuery = 'SELECT * FROM orders WHERE 1=1';
  
  const { query: paginatedQuery, values } = createCursorPaginationQuery(
    baseQuery, 
    cursor, 
    limit, 
    dbSortField, 
    sortDirection
  );

  const result = await query(paginatedQuery, values);
  const totalCountResult = await query('SELECT COUNT(*) FROM orders');

  const orders = result.rows;
  const totalCount = parseInt(totalCountResult.rows[0].count);

  // Create next cursor if there are more results
  const nextCursor = orders.length === limit 
    ? encodeCursor({
        [dbSortField]: orders[orders.length - 1][dbSortField],
        id: orders[orders.length - 1].id
      }) 
    : null;

  return {
    data: orders,
    nextCursor,
    totalCount
  };
};