import { AddModerSchema } from '@/schemas';
import axiosClient from '@/lib/axiosClient';
import * as z from 'zod';
import { UserListInfor } from '@/types/users';

const ENDPOINT = {
  GET_AUTHORIZE_USER: '/Account/GetAllAccount',
  GET_MODERATOR: '/Account/GetAllAccount',
  DELETE_USER: '/Account/DeleteAccount',
  ADD_MODERATOR: '/Auth/Register'
};

export const getAuthorizeUser = async (
  pageSize: number,
  pageNumber: number,
  token: string | undefined
): Promise<UserListInfor> => {
  const response = await axiosClient.get(
    `${ENDPOINT.GET_AUTHORIZE_USER}?RoleName=User&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getModer = async (
  pageSize: number,
  pageNumber: number,
  token: string | undefined
): Promise<UserListInfor> => {
  const response = await axiosClient.get(
    `${ENDPOINT.GET_MODERATOR}?RoleName=Moderator&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteUserById = async (id: string, token: string | undefined) => {
  const response = await axiosClient.delete(`${ENDPOINT.DELETE_USER}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const addModer = async (
  values: z.infer<typeof AddModerSchema>,
  token: string | undefined
) => {
  const response = await axiosClient.post(
    ENDPOINT.ADD_MODERATOR,
    {
      email: values.email,
      passwordHash: values.password,
      userName: values.username,
      fullName: values.fullname,
      phoneNumber: values.phoneNumber,
      roleId: 2
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  console.log(response.status);
  return response.data;
};
