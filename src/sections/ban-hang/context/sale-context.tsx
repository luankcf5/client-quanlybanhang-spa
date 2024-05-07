'use client';

import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

type SaleContextProps = {
  products: any;
  onAddNote: (productId: number, note: string) => void;
  onAddProduct: (product: any) => void;
  onRemoveProduct: (productId: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void;
};

// ----------------------------------------------------------------------

export const SaleContext = createContext({} as SaleContextProps);

export const useSaleContext = () => {
  const context = useContext(SaleContext);

  if (!context) throw new Error('useSaleContext must be use inside SaleProvider');

  return context;
};
