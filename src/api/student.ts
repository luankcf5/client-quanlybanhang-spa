import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IStudent } from 'src/types/student';

// ----------------------------------------------------------------------

const URL = endpoints.student.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetStudents() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      students: (data as IStudent[]) || [],
      studentsLoading: isLoading,
      studentsError: error,
      studentsValidating: isValidating,
      studentsEmpty: !isLoading && !data?.length,
    }),
    [data?.students, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createStudent(studentData: any) {
  const { data } = await axios.post(URL, studentData);
  return data;
}

// ----------------------------------------------------------------------

export async function createStudents(studentsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, studentsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateStudent(id: number, studentData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, studentData);
  return data;
}
