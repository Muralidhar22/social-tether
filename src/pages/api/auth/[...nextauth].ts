import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "prisma/client";
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: prisma ? PrismaAdapter(prisma) : undefined,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {

          const result = await prisma?.user.findUnique({
            where: { email: credentials?.email }
          })
          
          if(!result) {
            throw new Error("No user found")
          }
          
          const checkPassword = (result.password && credentials?.password)
          && await compare(credentials.password, result.password)
          
          if(!checkPassword || result.email !== credentials?.email) {
            throw new Error("Email or Password doesn't match");
          }
          
          return result
      },
    }),
  ],
  session: {
    strategy: "jwt"
  }
}

export default NextAuth(authOptions)