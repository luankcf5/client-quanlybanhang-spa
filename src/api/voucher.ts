import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IVoucher } from 'src/types/voucher';

// ----------------------------------------------------------------------

const URL = endpoints.voucher.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetVouchers() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      vouchers: (data as IVoucher[]) || [],
      vouchersLoading: isLoading,
      vouchersError: error,
      vouchersValidating: isValidating,
      vouchersEmpty: !isLoading && !data?.length,
    }),
    [data?.vouchers, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createVoucher(voucherData: any) {
  const { data } = await axios.post(URL, voucherData);
  return data;
}

// ----------------------------------------------------------------------

export async function createVouchers(vouchersData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, vouchersData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateVoucher(id: number, voucherData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, voucherData);
  return data;
}
