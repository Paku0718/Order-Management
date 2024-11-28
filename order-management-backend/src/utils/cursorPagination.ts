export const encodeCursor = (lastItem: any): string => {
    return Buffer.from(JSON.stringify(lastItem)).toString('base64');
  };
  
  export const decodeCursor = (cursor: string): any => {
    return JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
  };
  
  export const createCursorPaginationQuery = (
    baseQuery: string, 
    cursor: string | null, 
    limit: number, 
    sortField: string, 
    sortDirection: 'asc' | 'desc'
  ) => {
    const direction = sortDirection === 'asc' ? '>' : '<';
    const orderOperator = sortDirection === 'asc' ? 'ASC' : 'DESC';
  
    if (cursor) {
      const parsedCursor = decodeCursor(cursor);
      return {
        query: `
          ${baseQuery} 
          AND (${sortField}, id) ${direction} ($1, $2)
          ORDER BY ${sortField} ${orderOperator}, id ${orderOperator}
          LIMIT $3
        `,
        values: [parsedCursor[sortField], parsedCursor.id, limit]
      };
    }
  
    return {
      query: `
        ${baseQuery}
        ORDER BY ${sortField} ${orderOperator}, id ${orderOperator}
        LIMIT $1
      `,
      values: [limit]
    };
  };