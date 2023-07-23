import Post from "@models/postSchema";
import User from "@models/userSchema";
import { connectToDB } from "@utils/database";

// This is the GET route to get the posts that the user has saved

export const GET = async (request, { params }) => {
  try {
    await connectToDB(); // First, connect to the MongoDB database

    // DESCRIPTION: the populate() method is used to retrieve the user's saved posts and populate the savedPosts array
    // within the User model with the corresponding post objects. The nested populate() call inside the savedPosts array
    // is used to populate the creator field within each post object, replacing the ObjectId references with the actual
    // User objects. This allows you to access the full information of the user who created each saved post.
    const user = await User.findById(params.id).populate({
      path: "savedPosts",
      populate: {
        path: "creator",
        model: "User",
      },
    });
    const savedPosts = user.savedPosts; // Get the savedPosts array from the user
    return new Response(JSON.stringify(savedPosts), { status: 200 }); // Return the savedPosts as a JSON string);
  } catch (error) {
    console.log(error);
    return new Response("Failed to get saved posts", { status: 500 }); // return a 500 error if something went wrong
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { postId } = await request.json(); // Destructure `postId` from the request body
    await connectToDB();

    // Check if the post is already saved by the user
    const user = await User.findById(params.id);
    const isPostSaved = user.savedPosts.includes(postId);
    let updatedUser;

    if (isPostSaved) {
      // If the post is already saved, remove it from the `savedPosts` array
      updatedUser = await User.findByIdAndUpdate(params.id, {
        $pull: { savedPosts: postId },
      });
    } else {
      // If the post is not saved, add it to the `savedPosts` array
      updatedUser = await User.findByIdAndUpdate(params.id, {
        $push: { savedPosts: postId },
      });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error saving post", { status: 500 });
  }
};
