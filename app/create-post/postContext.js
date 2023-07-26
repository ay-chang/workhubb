"use client";

// postContext.js
import { createContext, useState, useContext } from "react";

// Create the context
const postContext = createContext();

// Create a custom hook to use the context
export const usePostContext = () => {
  return useContext(postContext);
};

// Create the context provider component
export const postProvider = ({ children }) => {
  const [userId, setUserId] = useState(true);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  return (
    <postContext.Provider
      value={{
        userId,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
