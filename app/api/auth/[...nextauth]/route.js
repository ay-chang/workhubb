import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/userSchema"; // Schema for creating a User

// This file is used to create a session for the user and to authenticate the user, creating the user

// NOTE: Every Next route is a serverless function meaning its a lambda function
// that opens up only when it gets called, so everytime it gets called, it needs to
// spin up the server and make a connection to the database. This means we dont have
// to keep the server running constantly, but it also means that we have to wait for
// the server to spin up and connect to the database before we can make a request.
// More information about next-auth: https://next-auth.js.org/getting-started/introduction

connectToDB(); // connect to the database using the function we created from util/database.js

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // We want to get data about the user everytime to keep a running session
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email }); // getting current user by matching email
      session.user.id = sessionUser._id.toString(); // updating session user id with the user id from the database
      return session; // constantly upadating to know which current user is online
    },

    // This function is called everytime a user signs in or creates an account, this creates a user if one doesnt exist
    // otherwise just signs in with an existing user
    async signIn({ profile }) {
      // Check if a user already exists
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(/ /g, "").toLowerCase(),
          image: profile.picture,
          savedPosts: [],
        });
      }

      return true; // Allow sign in
    },
  },
});

export { handler as GET, handler as POST };
