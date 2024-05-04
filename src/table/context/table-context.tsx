'use client';

import { useContext, createContext } from 'react';

import { TableContextProps } from 'src/types/table';

// ----------------------------------------------------------------------

export const TableContext = createContext({} as TableContextProps);

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) throw new Error('useTableContext must be use inside TableProvider');

  return context;
};
