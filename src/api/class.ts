import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IClass } from 'src/types/class';

// ----------------------------------------------------------------------

const URL = endpoints.class.root;

const role = sessionStorage.getItem('role');

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetClasses() {
  const { data, isLoading, error, isValidating } = useSWR(
    [
      URL,
      {
        headers: {
          as: role,
        },
      },
    ],
    fetcher,
    options
  );

  const memoizedValue = useMemo(
    () => ({
      classes: (data as IClass[]) || [],
      classesLoading: isLoading,
      classesError: error,
      classesValidating: isValidating,
      classesEmpty: !isLoading && !data?.length,
    }),
    [data?.classes, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetPublicClasses() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      classes: (data as IClass[]) || [],
      classesLoading: isLoading,
      classesError: error,
      classesValidating: isValidating,
      classesEmpty: !isLoading && !data?.length,
    }),
    [data?.classes, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createClass(classData: any) {
  const { data } = await axios.post(URL, classData);
  return data;
}

// ----------------------------------------------------------------------

export async function createClasses(classesData: IClass[]) {
  const { data } = await axios.post(`${URL}/batch`, {
    classes: classesData,
  });

  return data;
}

// ----------------------------------------------------------------------

export async function updateClass(id: number, classData: IClass) {
  const { data } = await axios.patch(`${URL}/${id}`, classData);
  return data;
}
