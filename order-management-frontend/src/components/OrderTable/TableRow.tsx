import React from 'react';
import { Order } from '../../types/order';

interface TableRowProps {
  order?: Order; // Make order optional
  style?: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ order, style }) => {
  // Early return if order is undefined or null
  if (!order) {
    return (
      <div 
        style={style} 
        className="flex items-center border-b hover:bg-gray-50 transition-colors"
      >
        <div className="w-full px-4 py-2 text-center text-gray-500">
          No order data available
        </div>
      </div>
    );
  }

  return (
    <div 
      style={style} 
      className="flex items-center border-b hover:bg-gray-50 transition-colors"
    >
      <div className="w-1/6 px-4 py-2 truncate">{order.id || 'N/A'}</div>
      <div className="w-1/6 px-4 py-2 truncate">{order.customerName || 'Unknown'}</div>
      <div className="w-1/6 px-4 py-2 text-right">
        ${(order.orderAmount ?? 0).toFixed(2)}
      </div>
      <div className="w-1/6 px-4 py-2">
        <span 
          className={`px-2 py-1 rounded text-xs ${
            order.status === 'completed' ? 'bg-green-200 text-green-800'
            : order.status === 'pending' ? 'bg-yellow-200 text-yellow-800'
            : order.status === 'processing' ? 'bg-blue-200 text-blue-800'
            : 'bg-red-200 text-red-800'
          }`}
        >
          {order.status || 'Unknown'}
        </span>
      </div>
      <div className="w-1/6 px-4 py-2 truncate">
        {order.createdAt 
          ? new Date(order.createdAt).toLocaleDateString() 
          : 'N/A'}
      </div>
      <div className="w-1/6 px-4 py-2">{order.items?.length ?? 0}</div>
    </div>
  );
};

export default React.memo(TableRow);