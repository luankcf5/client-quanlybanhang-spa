import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IProduct } from 'src/types/product';

// ----------------------------------------------------------------------

const URL = endpoints.product.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetProducts() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      products: (data as IProduct[]) || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createProduct(productData: any) {
  const { data } = await axios.post(URL, productData);
  return data;
}

// ----------------------------------------------------------------------

export async function createProducts(productsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, productsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateProduct(id: number, productData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, productData);
  return data;
}
