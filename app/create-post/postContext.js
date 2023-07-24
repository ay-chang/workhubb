"use client";

// CreatePostContext.js
import { createContext, useState, useContext } from "react";

// Create the context
const CreatePostContext = createContext();

// Create a custom hook to use the context
export const useCreatePostContext = () => {
  return useContext(CreatePostContext);
};

// Create the context provider component
export const CreatePostProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  return (
    <CreatePostContext.Provider
      value={{
        userId,
        setUserId,
        title,
        setTitle,
        post,
        setPost,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
