'use server';
import { addModer } from '@/app/api/user/user.api';
import { AddModerSchema } from '@/schemas';
import * as z from 'zod';

export const AddModer = async (
  values: z.infer<typeof AddModerSchema>,
  token: string | undefined
) => {
  const validatedFields = AddModerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, username, fullname, phoneNumber, password } =
    validatedFields.data;

  const newUserData = { email, username, fullname, phoneNumber, password };

  const response = await addModer(newUserData, token);
  return response;
};
