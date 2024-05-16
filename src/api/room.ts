import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

import { IRoom } from 'src/types/room';

// ----------------------------------------------------------------------

const URL = endpoints.room.root;

const options = {
  revalidateIfStale: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
};

export function useGetRooms() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      rooms: (data as IRoom[]) || [],
      roomsLoading: isLoading,
      roomsError: error,
      roomsValidating: isValidating,
      roomsEmpty: !isLoading && !data?.length,
    }),
    [data?.rooms, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createRoom(roomData: any) {
  const { data } = await axios.post(URL, roomData);
  return data;
}

// ----------------------------------------------------------------------

export async function createRooms(roomsData: any[]) {
  const { data } = await axios.post(`${URL}/batch`, roomsData);

  return data;
}

// ----------------------------------------------------------------------

export async function updateRoom(id: number, roomData: any) {
  const { data } = await axios.patch(`${URL}/${id}`, roomData);
  return data;
}
