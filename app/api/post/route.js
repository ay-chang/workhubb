import Post from "@models/post";
import { connectToDB } from "@utils/database";

// This file is the API route that retrives a post from the database which is being mapped
// in with the Feed Component. This route is called everytime to produce each individual post

export const GET = async (request) => {
  try {
    await connectToDB(); // first connect to the mongoDB database
    const posts = await Post.find({}).populate("creator"); // get all the posts from the database
    return new Response(JSON.stringify(posts), { status: 200 }); // return the posts as a JSON string
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 }); // return a 500 error if something went wrong
  }
};
