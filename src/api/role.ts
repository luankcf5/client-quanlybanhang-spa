import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IRole } from 'src/types/role';

// ----------------------------------------------------------------------

const URL = endpoints.role.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetRoles() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      roles: (data as IRole[]) || [],
      rolesLoading: isLoading,
      rolesError: error,
      rolesValidating: isValidating,
      rolesEmpty: !isLoading && !data?.length,
    }),
    [data?.roles, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createRole(roleData: any) {
  const { data } = await axios.post(URL, roleData);
  return data;
}

// ----------------------------------------------------------------------

export async function createRoles(rolesData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, rolesData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateRole(id: number, roleData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, roleData);
  return data;
}
