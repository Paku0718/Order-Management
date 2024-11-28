import React from 'react';
import { Order } from '../../types/order';

interface TableRowProps {
  order: Order;
  style?: React.CSSProperties;
}

const TableRow: React.FC<TableRowProps> = ({ order, style }) => {
  return (
    <div 
      style={style} 
      className="flex items-center border-b hover:bg-gray-50 transition-colors"
    >
      <div className="w-1/6 px-4 py-2 truncate">{order.id}</div>
      <div className="w-1/6 px-4 py-2 truncate">{order.customerName}</div>
      <div className="w-1/6 px-4 py-2 text-right">${order.orderAmount.toFixed(2)}</div>
      <div className="w-1/6 px-4 py-2">
        <span 
          className={`px-2 py-1 rounded text-xs ${
            order.status === 'completed' ? 'bg-green-200 text-green-800'
            : order.status === 'pending' ? 'bg-yellow-200 text-yellow-800'
            : order.status === 'processing' ? 'bg-blue-200 text-blue-800'
            : 'bg-red-200 text-red-800'
          }`}
        >
          {order.status}
        </span>
      </div>
      <div className="w-1/6 px-4 py-2 truncate">{new Date(order.createdAt).toLocaleDateString()}</div>
      <div className="w-1/6 px-4 py-2">{order.items.length}</div>
    </div>
  );
};

export default React.memo(TableRow);