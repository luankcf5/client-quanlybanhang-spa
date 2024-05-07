'use client';

import { useMemo, useState, useCallback } from 'react';

import { SaleContext } from './sale-context';

// ----------------------------------------------------------------------

const initialState = {
  products: [],
};

type Props = {
  children: React.ReactNode;
};

export function SaleProvider({ children }: Props) {
  const [values, setValues] = useState(initialState);

  // cập nhật state
  const setValue = useCallback(
    (name: string, value: any) => {
      setValues((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setValues]
  );

  // thêm sản phẩm mới vào hoá đơn
  const onAddProduct = useCallback(
    (product: any) => {
      const productIds = values.products.map((prod: any) => prod.id);
      if (productIds.includes(product.id)) {
        const updateProducts = values.products.map((prod: any) => {
          if (prod.id === product.id) return { ...prod, quantity: prod.quantity + 1 };
          return prod;
        });
        setValue('products', updateProducts);
      } else {
        setValue('products', [{ ...product, quantity: 1 }, ...values.products]);
      }
    },
    [values.products, setValue]
  );

  // xoá một sản phẩm ra khỏi danh sách
  const onRemoveProduct = useCallback(
    (productId: number) => {
      setValue(
        'products',
        values.products.filter((product: any) => product.id !== productId)
      );
    },
    [values.products, setValue]
  );

  // thêm ghi chú cho một sản phẩm
  const onAddNote = useCallback(
    (productId: number, note: string) => {
      const updateProducts = values.products.map((prod: any) => {
        if (prod.id === productId) return { ...prod, note };
        return prod;
      });
      setValue('products', updateProducts);
    },
    [values.products, setValue]
  );

  // thay đổi số lượng sản phẩm
  const onChangeQuantity = useCallback(
    (productId: number, quantity: number) => {
      const updateProducts = values.products.map((product: any) => {
        if (product.id === productId) return { ...product, quantity };
        return product;
      });
      setValue('products', updateProducts);
    },
    [values.products, setValue]
  );

  const memoizedValue = useMemo(
    () => ({
      ...values,
      setValue,
      onAddNote,
      onAddProduct,
      onRemoveProduct,
      onChangeQuantity,
    }),
    [values, setValue, onAddNote, onAddProduct, onRemoveProduct, onChangeQuantity]
  );

  return <SaleContext.Provider value={memoizedValue}>{children}</SaleContext.Provider>;
}
