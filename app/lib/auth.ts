import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db";
import { User } from "@/app/models/User";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firstName: string;
    lastName: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const nameParts = user.name?.split(" ") || ["User"];
          existingUser = new User({
            firstName: nameParts[0],
            lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
            email: user.email,
            image: user.image,
          });

          await existingUser.save();
        }
      }
      return true;
    },
    async session({ session, token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: token.email });

      session.user.id = dbUser?._id.toString() || token.sub!;
      session.user.firstName = dbUser?.firstName || token.firstName;
      session.user.lastName = dbUser?.lastName || token.lastName;
      session.user.email = dbUser?.email || token.email;
      session.user.image = dbUser?.image || token.picture;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
  },
};