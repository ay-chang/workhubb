import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, // Reference the object Id of the user
    ref: "User", // reference to the User model to create a relationship, one to many relationship
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  post: {
    type: String,
    required: [true, "Post is required."],
  },
  amount: {
    type: String,
    required: [true, "Amount is required."],
  },
  tags: [
    {
      type: String,
      required: [true, "Tags are required."],
    },
  ],
});

const Post = models.Post || model("Post", PostSchema); // if the model exists, use it; otherwise, create it

export default Post;
