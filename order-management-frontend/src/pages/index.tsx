// import React from 'react';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import VirtualTable from '../components/OrderTable/VirtualTable';
// import { queryClient } from '../lib/queryClient';

// const Home: React.FC = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <main className="min-h-screen bg-gray-50">
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-6">Order Management</h1>
//           <VirtualTable />
//         </div>
//       </main>
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// };

// export default Home;

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import VirtualTable from '../components/OrderTable/VirtualTable';
import { queryClient } from '../lib/queryClient';

const Home: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gray-50 animate-fade-in">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Order Management
              </h1>
              <p className="text-gray-600">
                Efficiently manage and track your orders
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
                Export Orders
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                Add New Order
              </button>
            </div>
          </header>
          <VirtualTable />
        </div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Home;