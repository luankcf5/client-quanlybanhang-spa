import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ICustomer } from 'src/types/customer';

// ----------------------------------------------------------------------

const URL = endpoints.customer.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetCustomers() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      customers: (data as ICustomer[]) || [],
      customersLoading: isLoading,
      customersError: error,
      customersValidating: isValidating,
      customersEmpty: !isLoading && !data?.length,
    }),
    [data?.customers, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createCustomer(customerData: any) {
  const { data } = await axios.post(URL, customerData);
  return data;
}

// ----------------------------------------------------------------------

export async function createCustomers(customersData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, customersData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateCustomer(id: number, customerData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, customerData);
  return data;
}
