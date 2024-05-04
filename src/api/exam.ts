import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IExam } from 'src/types/exam';

// ----------------------------------------------------------------------

const URL = endpoints.exam.root;

const role = sessionStorage.getItem('role');

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetExams() {
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
      exams: (data as IExam[]) || [],
      examsLoading: isLoading,
      examsError: error,
      examsValidating: isValidating,
      examsEmpty: !isLoading && !data?.length,
    }),
    [data?.exams, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createExam(examData: any) {
  const { data } = await axios.post(URL, examData);
  return data;
}

// ----------------------------------------------------------------------

export async function createExams(examsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, examsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateExam(id: number, examData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, examData);
  return data;
}
