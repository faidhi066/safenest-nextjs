import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "@/auth.config";

import { db } from "./lib/prisma";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      login_id: number;
      user_id: string;
      email: string;
      password_hash: string;
      last_login: Date;
      created_at: Date;
      updated_at: Date;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  // Configure session callbacks to customize session data
  callbacks: {
    async session({ session, token }) {
      // Include additional properties like `role` in the session object
      if (token) {
        session.user = { ...session.user, ...token };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Include user role in token if it is available
      if (user) {
        return { ...user };
      }
      return token;
    },
    async authorized({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },

  // Additional NextAuth options
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/", // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
});
