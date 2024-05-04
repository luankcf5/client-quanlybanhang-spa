import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IQuestion } from 'src/types/question';

// ----------------------------------------------------------------------

const URL = endpoints.question.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetQuestions() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      questions: (data as IQuestion[]) || [],
      questionsLoading: isLoading,
      questionsError: error,
      questionsValidating: isValidating,
      questionsEmpty: !isLoading && !data?.length,
    }),
    [data?.questions, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createQuestion(questionData: any) {
  const { data } = await axios.post(URL, questionData);
  return data;
}

// ----------------------------------------------------------------------

export async function createQuestions(questionsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, questionsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateQuestion(id: number, questionData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, questionData);
  return data;
}
