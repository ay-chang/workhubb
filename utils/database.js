import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // removes warnings in console

  if (isConnected) {
    console.log("MongoDB is already connected");
    return; // break out of const connectToDB function
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "workhubb",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
