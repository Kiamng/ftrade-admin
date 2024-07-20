import axiosClient from '@/lib/axiosClient';
import { City } from '@/types/city';

const END_POINT = {
  GET_ALL: '/City/GetAllCities',
  CREATE: '/City/CreateCity',
  UPDATE: '/City/UpdateCity',
  DELETE: '/City/DeleteCity'
};

export const getAllCities = async (token: string): Promise<City[]> => {
  const response = await axiosClient.get(END_POINT.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createCity = async (token: string, name: string) => {
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

export const updateCity = async (token: string, id: string, name: string) => {
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

export const deleteCity = async (token: string, id: string) => {
  const response = await axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
