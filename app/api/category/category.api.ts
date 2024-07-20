import axiosClient from '@/lib/axiosClient';
import { Category } from '@/types/category';

const END_POINT = {
  GET_ALL: '/Category/GetAllCategories',
  CREATE: '/Category/CreateCategory',
  UPDATE: '/Category/UpdateCategory',
  DELETE: '/Category/DeleteCategory'
};

export const getAllCategories = async (token: string): Promise<Category[]> => {
  const response = await axiosClient.get(END_POINT.GET_ALL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createCategory = async (token: string, name: string) => {
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

export const updateCategory = async (
  token: string,
  id: string,
  name: string
) => {
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

export const deleteCategory = async (token: string, id: string) => {
  const response = await axiosClient.delete(`${END_POINT.DELETE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
