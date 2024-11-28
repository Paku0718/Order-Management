import React from 'react';
import { useTableStateStore } from '../../stores/tableStateStore';

const TableHeader: React.FC = () => {
  const { sortField, sortDirection, setSorting } = useTableStateStore();

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customerName', label: 'Customer' },
    { key: 'orderAmount', label: 'Total Amount' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date' },
    { key: 'items', label: 'Items' }
  ];

  return (
    <div className="flex sticky top-0 bg-white shadow-sm z-10">
      {columns.map((column) => (
        <div 
          key={column.key}
          className={`w-1/6 px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center 
            ${sortField === column.key ? 'font-bold' : ''}`}
          onClick={() => setSorting(column.key)}
        >
          {column.label}
          {sortField === column.key && (
            <span className="ml-2">
              {sortDirection === 'asc' ? '▲' : '▼'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;