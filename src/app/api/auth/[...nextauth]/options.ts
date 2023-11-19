import type { NextAuthOptions, CallbacksOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("Credentials:", credentials);

        const loginRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: `${credentials?.username}`,
              password: `${credentials?.password}`,
            }),
          }
        );

        const loginResult = await loginRes.json();

        if (!loginRes.ok) {
          // toast.error(user.error);
          return null;
        }

        return loginResult;

        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        // return user;
      },
    }),
  ],
  pages: {
    // signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  //   pages: {},
};
