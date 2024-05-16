'use client';

import { useContext, createContext } from 'react';

import { IBill } from 'src/types/bill';
import { IProduct } from 'src/types/product';

// ----------------------------------------------------------------------

type SaleContextProps = {
  products: IProduct[];
  selectedBill: IBill | null;
  onGetBill: (bill: IBill | null) => void;
  onAddNote: (productId: number, note: string) => void;
  onAddProduct: (product: IProduct[]) => void;
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
