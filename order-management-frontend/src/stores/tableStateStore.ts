import { create } from 'zustand';

interface TableState {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  setSorting: (field: string) => void;
}

export const useTableStateStore = create<TableState>((set) => ({
  sortField: 'created_at', // Use snake_case
  sortDirection: 'desc',
  setSorting: (field) => set((state) => {
    // Map camelCase to snake_case
    const columnMapping: { [key: string]: string } = {
      createdAt: 'created_at',
      customerName: 'customer_name',
      orderAmount: 'order_amount'
    };
    
    const mappedField = columnMapping[field] || field;

    return {
      sortField: mappedField,
      sortDirection: state.sortField === mappedField 
        ? (state.sortDirection === 'asc' ? 'desc' : 'asc')
        : 'desc'
    };
  })
}));