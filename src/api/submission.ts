import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { ISubmission } from 'src/types/submission';

// ----------------------------------------------------------------------

const URL = endpoints.submission.root;

const role = sessionStorage.getItem('role');

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetSubmissions() {
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
      submissions: (data as ISubmission[]) || [],
      submissionsLoading: isLoading,
      submissionsError: error,
      submissionsValidating: isValidating,
      submissionsEmpty: !isLoading && !data?.length,
    }),
    [data?.submissions, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMySubmission() {
  const { data, isLoading, error, isValidating } = useSWR(
    `${URL}/my-submissions`,
    fetcher,
    options
  );

  const memoizedValue = useMemo(
    () => ({
      submissions: (data as ISubmission[]) || [],
      submissionsLoading: isLoading,
      submissionsError: error,
      submissionsValidating: isValidating,
      submissionsEmpty: !isLoading && !data?.length,
    }),
    [data?.submissions, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetSubmissionsByExamId(examId: number | string) {
  const { data, isLoading, error, isValidating } = useSWR(
    [
      `${URL}/exam/${examId}`,
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
      submissions: (data as ISubmission[]) || [],
      submissionsLoading: isLoading,
      submissionsError: error,
      submissionsValidating: isValidating,
      submissionsEmpty: !isLoading && !data?.length,
    }),
    [data?.submissions, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetSubmissionByExamId(examId: number) {
  const { data, isLoading, error, isValidating } = useSWR(
    [
      `${URL}/exam/${examId}`,
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
      submission: data as ISubmission,
      submissionLoading: isLoading,
      submissionError: error,
      submissionValidating: isValidating,
      submissionEmpty: !isLoading && !data,
    }),
    [data?.submission, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// ----------------------------------------------------------------------

export async function createSubmission(submissionData: any) {
  const { data } = await axios.post(URL, submissionData);
  return data;
}

// ----------------------------------------------------------------------

export async function lockSubmission(submissionData: any) {
  const { data } = await axios.patch(`${URL}/lock`, submissionData);
  return data;
}

// ----------------------------------------------------------------------

export async function updateSubmission(id: number, submissionData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, submissionData);
  return data;
}
