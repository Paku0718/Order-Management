import { create } from 'zustand';

interface TableState {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  setSorting: (field: string) => void;
}

export const useTableStateStore = create<TableState>((set) => ({
  sortField: 'createdAt',
  sortDirection: 'desc',
  setSorting: (field) => set((state) => ({
    sortField: field,
    sortDirection: state.sortField === field 
      ? (state.sortDirection === 'asc' ? 'desc' : 'asc')
      : 'desc'
  }))
}));