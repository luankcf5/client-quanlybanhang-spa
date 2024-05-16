'use client';

import { useMemo, useState, useCallback } from 'react';

import { updateBill } from 'src/api/bill';

import { IBill } from 'src/types/bill';

import { SaleContext } from './sale-context';

// ----------------------------------------------------------------------

const initialState = {
  products: [],
  selectedBill: null,
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
  const onGetBill = useCallback(
    (bill: IBill | null) => {
      setValue('selectedBill', bill);
      setValue('products', bill?.products || []);
    },
    [setValue]
  );

  // thêm sản phẩm mới vào hoá đơn
  const onAddProduct = useCallback(
    (product: any) => {
      const productIds = values.products.map((prod: any) => prod.product.id);
      if (productIds.includes(product.id)) {
        const updateProducts = values.products.map((prod: any) => {
          if (prod.product.id === product.id)
            return { ...prod, amount: prod.amount + 1, note: prod.note };
          return prod;
        });
        setValue('products', updateProducts);
        // @ts-ignore
        updateBill(values.selectedBill?.id, {
          orders: updateProducts.map((prod) => ({
            productId: prod.product.id,
            amount: prod.amount,
            note: prod.note,
          })),
        });
      } else {
        setValue('products', [{ product, amount: 1 }, ...values.products]);
        // @ts-ignore
        updateBill(values.selectedBill?.id, {
          orders: [{ product, amount: 1, note: '' }, ...values.products].map((prod) => ({
            productId: prod.product.id,
            amount: prod.amount,
            note: prod.note,
          })),
        });
      }
    },
    [values.products, setValue, updateBill]
  );

  // xoá một sản phẩm ra khỏi danh sách
  const onRemoveProduct = useCallback(
    (productId: number) => {
      const updateProduct = values.products.filter(
        (product: any) => product.product.id !== productId
      );
      setValue('products', updateProduct);
      // @ts-ignore
      updateBill(values.selectedBill?.id, {
        orders: updateProduct.map((prod: any) => ({
          productId: prod.product.id,
          amount: prod.amount,
          note: prod.note,
        })),
      });
    },
    [values.products, setValue]
  );

  // thêm ghi chú cho một sản phẩm
  const onAddNote = useCallback(
    async (productId: number, note: string) => {
      const updateProducts = values.products.map((prod: any) => {
        if (prod.product.id === productId) return { ...prod, note };
        return prod;
      });
      setValue('products', updateProducts);
      // @ts-ignore
      updateBill(values.selectedBill?.id, {
        orders: updateProducts.map((prod) => ({
          productId: prod.product.id,
          amount: prod.amount,
          note: prod.note,
        })),
      });
    },
    [values.products, setValue]
  );

  // thay đổi số lượng sản phẩm
  const onChangeQuantity = useCallback(
    (productId: number, amount: number) => {
      const updateProducts = values.products.map((product: any) => {
        if (product.product.id === productId) return { ...product, amount };
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
      onGetBill,
      onAddNote,
      onAddProduct,
      onRemoveProduct,
      onChangeQuantity,
    }),
    [values, setValue, onGetBill, onAddNote, onAddProduct, onRemoveProduct, onChangeQuantity]
  );

  return <SaleContext.Provider value={memoizedValue}>{children}</SaleContext.Provider>;
}
