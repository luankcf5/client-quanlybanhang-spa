import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IStore } from 'src/types/store';

// ----------------------------------------------------------------------

const URL = endpoints.store.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetStores() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      stores: (data as IStore[]) || [],
      storesLoading: isLoading,
      storesError: error,
      storesValidating: isValidating,
      storesEmpty: !isLoading && !data?.length,
    }),
    [data?.stores, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createStore(storeData: any) {
  const { data } = await axios.post(URL, storeData);
  return data;
}

// ----------------------------------------------------------------------

export async function createStores(storesData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, storesData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateStore(id: number, storeData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, storeData);
  return data;
}
