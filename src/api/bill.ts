import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IBill } from 'src/types/bill';

// ----------------------------------------------------------------------

const URL = endpoints.bill.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetBills() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      bills: (data as IBill[]) || [],
      billsLoading: isLoading,
      billsError: error,
      billsValidating: isValidating,
      billsEmpty: !isLoading && !data?.length,
    }),
    [data?.bills, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetBill(billId: any) {
  const { data, isLoading, error, isValidating } = useSWR(
    billId ? `${URL}/${billId}` : null,
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      bill: data as IBill,
      billLoading: isLoading,
      billError: error,
      billValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function getBill(billId: any) {
  const { data } = await axios.get(`${URL}/${billId}`);
  return data;
}

// ----------------------------------------------------------------------

export async function createBill(billData: any) {
  const { data } = await axios.post(URL, billData);
  return data;
}

// ----------------------------------------------------------------------

export async function createBills(billsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, billsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateBill(id: any, billData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, billData);
  return data;
}
