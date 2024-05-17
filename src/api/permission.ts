import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IPermission } from 'src/types/permission';

// ----------------------------------------------------------------------

const URL = endpoints.permission.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetPermissions() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      permissions: (data as IPermission[]) || [],
      permissionsLoading: isLoading,
      permissionsError: error,
      permissionsValidating: isValidating,
      permissionsEmpty: !isLoading && !data?.length,
    }),
    [data?.permissions, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createPermission(permissionData: any) {
  const { data } = await axios.post(URL, permissionData);
  return data;
}

// ----------------------------------------------------------------------

export async function createPermissions(permissionsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, permissionsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updatePermission(id: number, permissionData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, permissionData);
  return data;
}
