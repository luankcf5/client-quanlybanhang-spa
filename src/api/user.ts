import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IUser } from 'src/types/user';

// ----------------------------------------------------------------------

const URL = endpoints.user.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetUsers() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      users: (data as IUser[]) || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.length,
    }),
    [data?.users, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createUser(userData: any) {
  const { data } = await axios.post(URL, userData);
  return data;
}

// ----------------------------------------------------------------------

export async function createUsers(usersData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, usersData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateUser(id: number, userData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, userData);
  return data;
}
