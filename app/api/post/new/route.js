import Post from "@models/postSchema";
import { connectToDB } from "@utils/database";

// POST request to create a new post at /api/post/new. This route is called everytime
// a user creates a new post from the Form component. The reason this route is in
// the post/new folder is because this is how NextJS knows which url to use.

export const POST = async (request) => {
  const { userId, title, post, tags, amount } = await request.json(); // Waits for the request to be made and then deconstructs the request body

  try {
    await connectToDB(); // first connect to the mongoDB database
    const newPost = new Post({ creator: userId, title, post, tags, amount }); // get the post details from
    await newPost.save(); // save the post to the database

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new post", { status: 500 });
  }
};
