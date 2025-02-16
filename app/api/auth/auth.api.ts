import axiosClient from '@/lib/axiosClient';
import { LoginSchema } from '@/schemas';
import https from 'https';
import * as z from 'zod';

const ENDPOINT = {
  LOGIN: '/Auth/Login'
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const response = await axiosClient.post(
    ENDPOINT.LOGIN,
    {
      email: values.email,
      password: values.password
    },
    {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    }
  );
  return response.data;
};
