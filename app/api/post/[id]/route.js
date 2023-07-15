import Post from "@models/postSchema";
import { connectToDB } from "@utils/database";

// Routes for editing and deleting posts that belong to the session user

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // first connect to the mongoDB database
    const post = await Post.findById(params.id).populate("creator"); // get all the posts from the database
    if (!post) return new Response("Post not found", { status: 404 }); // return a 404 error if the post is not found

    return new Response(JSON.stringify(post), { status: 200 }); // return the posts as a JSON string
  } catch (error) {
    return new Response("Failed to get posts", { status: 500 }); // return a 500 error if something went wrong
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  const { post, tag, title, amount } = await request.json();

  try {
    await connectToDB();

    const existingPost = await Post.findById(params.id);

    if (!existingPost) return new Response("Post not found", { status: 404 });

    existingPost.post = post;
    existingPost.tag = tag;
    existingPost.title = title;
    existingPost.amount = amount;

    await existingPost.save();

    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update post", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the post by ID and remove it
    await Post.findByIdAndRemove(params.id);

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error deleting post", { status: 500 });
  }
};
