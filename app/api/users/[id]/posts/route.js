import Post from "@models/postSchema";
import { connectToDB } from "@utils/database";

// This is the GET route for the posts of a specific user

export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // first connect to the mongoDB database
    // get all the posts from the database from the specific creator being the user id
    const posts = await Post.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 }); // return the posts as a JSON string
  } catch (error) {
    console.log(error);
    return new Response("Failed to get posts", { status: 500 }); // return a 500 error if something went wrong
  }
};
