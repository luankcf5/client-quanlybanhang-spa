import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ICategory } from 'src/types/category';

// ----------------------------------------------------------------------

const URL = endpoints.category.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetCategories() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      categories: (data as ICategory[]) || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesValidating: isValidating,
      categoriesEmpty: !isLoading && !data?.length,
    }),
    [data?.categories, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createCategory(categoryData: any) {
  const { data } = await axios.post(URL, categoryData);
  return data;
}

// ----------------------------------------------------------------------

export async function createCategories(categoriesData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, categoriesData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateCategory(id: number, categoryData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, categoryData);
  return data;
}
