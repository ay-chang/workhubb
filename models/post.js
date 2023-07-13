import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, // Reference the object Id of the user
    ref: "User", // reference to the User model to create a relationship, one to many relationship
  },
  post: {
    type: String,
    required: [true, "Post is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Post = models.Post || model("Post", PostSchema); // if the model exists, use it; otherwise, create it

export default Post;
