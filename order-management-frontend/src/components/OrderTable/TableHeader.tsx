// import React from 'react';
// import { useTableStateStore } from '../../stores/tableStateStore';

// const TableHeader: React.FC = () => {
//   const { sortField, sortDirection, setSorting } = useTableStateStore();

//   const columns = [
//     { key: 'id', label: 'Order ID' },
//     { key: 'customerName', label: 'Customer' },
//     { key: 'orderAmount', label: 'Total Amount' },
//     { key: 'status', label: 'Status' },
//     { key: 'createdAt', label: 'Date' },
//     { key: 'items', label: 'Items' }
//   ];

//   return (
//     <div className="flex sticky top-0 bg-white shadow-sm z-10">
//       {columns.map((column) => (
//         <div 
//           key={column.key}
//           className={`w-1/6 px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center 
//             ${sortField === column.key ? 'font-bold' : ''}`}
//           onClick={() => setSorting(column.key)}
//         >
//           {column.label}
//           {sortField === column.key && (
//             <span className="ml-2">
//               {sortDirection === 'asc' ? '▲' : '▼'}
//             </span>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TableHeader;

import React from 'react';
import { useTableStateStore } from '../../stores/tableStateStore';

const TableHeader: React.FC = () => {
  const { sortField, sortDirection, setSorting } = useTableStateStore();

  const columns = [
    { key: 'id', label: 'Order ID', width: 'w-[15%]' },
    { key: 'customerName', label: 'Customer', width: 'w-[20%]' },
    { key: 'orderAmount', label: 'Total Amount', width: 'w-[15%]' },
    { key: 'status', label: 'Status', width: 'w-[15%]' },
    { key: 'createdAt', label: 'Date', width: 'w-[15%]' },
    { key: 'items', label: 'Items', width: 'w-[20%]' }
  ];

  return (
    <div className="sticky top-0 z-10 flex bg-white shadow-subtle border-b border-gray-200 text-gray-600 font-medium">
      {columns.map((column) => (
        <div 
          key={column.key}
          className={`${column.width} px-4 py-3 cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out flex items-center group`}
          onClick={() => setSorting(column.key)}
        >
          <span className={`
            group-hover:text-primary-600 transition-colors 
            ${sortField === column.key ? 'text-primary-700 font-semibold' : ''}
          `}>
            {column.label}
          </span>
          {sortField === column.key && (
            <span className={`ml-2 text-xs ${
              sortDirection === 'asc' 
                ? 'text-green-500 rotate-180' 
                : 'text-red-500'
            }`}>
              ▼
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;