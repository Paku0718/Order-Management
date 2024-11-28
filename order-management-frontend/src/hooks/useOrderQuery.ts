import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchOrders } from '../lib/api';
import { useTableStateStore } from '../stores/tableStateStore';

export const useOrdersQuery = () => {
  const { sortField, sortDirection } = useTableStateStore();

  return useInfiniteQuery({
    queryKey: ['orders', sortField, sortDirection],
    queryFn: ({ pageParam }) => {
      console.log('Fetching orders with params:', { 
        pageParam, 
        sort: sortField, 
        sortDirection 
      });
      return fetchOrders({
        pageParam,
        sort: sortField,
        sortDirection
      });
    },
    getNextPageParam: (lastPage) => {
      console.log('Last page:', lastPage);
      return lastPage.nextCursor;
    },
    initialPageParam: null,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};