import React, { useCallback, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Order } from '../../types/order';
import { useOrdersQuery } from '../../hooks/useOrderQuery';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import LoadingSpinner from '../LoadingSpinner';

const VirtualTable: React.FC = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isLoading 
  } = useOrdersQuery();

  // Flatten the pages into a single array of orders
  const orders = data?.pages.flatMap((page) => page.data) || [];

  // Ref for the list component
  const listRef = useRef<any>(null);

  // Infinite loader item count
  const itemCount = hasNextPage ? orders.length + 1 : orders.length;

  // Load more items
  const loadMoreItems = useCallback(async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  // Check if an item is loaded
  const isItemLoaded = (index: number) => 
    !hasNextPage || index < orders.length;

  // Row renderer
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    const order = orders[index];
    return order ? (
      <TableRow 
        key={order.id} 
        order={order} 
        style={style} 
      />
    ) : null;
  };

  // If no data and still loading, show a subtle loading indicator
  if (isLoading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

  // If no data and not loading, show empty state
  if (!isLoading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No orders found
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-auto">
      <TableHeader />
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            ref={(list) => {
              ref(list);
              listRef.current = list;
            }}
            height={window.innerHeight - 100} // Adjust based on header/footer
            itemCount={itemCount}
            itemSize={50} // Adjust row height as needed
            width="100%"
            onItemsRendered={onItemsRendered}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
      {isFetchingNextPage && (
        <div className="w-full flex justify-center p-4">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
            <span>Loading more...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTable;