import axiosClient from '@/lib/axiosClient';
import { Genre } from '@/types/genre';

export const END_POINT = {
  GET_ALL: '/Genre/GetAllGenres',
  CREATE: '/Genre/CreateGenre',
  UPDATE: '/Genre/UpdateGenre',
  DELETE: '/Genre/DeleteGenre'
};

export const getAllGenres = async (token: string): Promise<Genre[]> => {
  const response = await axiosClient.get(END_POINT.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createGenre = async (token: string, name: string) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE}`,
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const updateGenre = async (token: string, id: string, name: string) => {
  const response = await axiosClient.put(
    `${END_POINT.UPDATE}/${id}`,
    { name: name },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteGenre = async (token: string, id: string) => {
  const response = await axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
