import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"], // if email is unique return true, if not, display message
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ], // regex to check if username is valid
  },
  image: {
    type: String,
  },
  savedPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      unique: true,
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;

// The "models" object is porvided by the Mongoose libarary and
// stores all the registered models. If a model name "User" already
// exists is the "models" object, it assigns that existing model to
// the "User" variable. If not, it creates a new model called "User".
// This prevents us from redefining the models and that the existing
// model is reused instead.
