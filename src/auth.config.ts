import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./db/auth";
import { SignInSchema } from "./schemas/zod.schema";

export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      async authorize(credentials) {
        let user = null;

        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          console.log("LOGGING IN API ROUTE -----");

          console.log(email, password);
          // logic to verify if the user exists
          user = await getUserByEmail(email);

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            // throw new Error("User not found.");
            return null;
          }

          console.log(user);
          // OPTION 1
          // If using hashed
          const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
          );

          // OPTION 2
          // If using normal text password
          //   const passwordMatch = password === user.password_hash;
          if (!passwordMatch) {
            return null;
          }

          // return user object with their profile data
          return {
            ...user,
          };
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
