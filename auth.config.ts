import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

import { LoginSchema } from '@/schemas';
import { login } from '@/app/api/auth/auth.api';
// import { toast } from "sonner";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SCERET
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const response = await login({
              email: email,
              password: password
            });
            const user = response.data;
            if (user) {
              if (user.role.name === 'Admin' || 'Moderator') {
                return user;
              }
            } else {
              return null;
            }
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
  secret: process.env.JWT_SCERET
} satisfies NextAuthConfig;
