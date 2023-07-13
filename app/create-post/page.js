"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; // lets us know which user is currently logged in
import { useRouter } from "next/navigation"; // lets us navigate to different pages

import Form from "@components/Form";

/**
 * Things to implement in this file
 *
 * TODO:
 * - Edit post details, include: post title
 */

const CreatePost = () => {
  const router = useRouter(); // router object
  const { data: session } = useSession(); // session object

  const [submitting, setSubmitting] = useState(false); // state for submitting form
  const [post, setPost] = useState({ post: "", tag: "" }); // state for post details

  // Make a POST request to the API which is in MongoDB
  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // The URL that the request is sent to is api/post/new, this is defined in the post/new/route.js file.
      // The second argument to the fetch function is an options object that configures
      // the request. In this case, it includes the following properties:
      // 1. method: "POST": Specifies the HTTP method of the request as POST.
      // 2. body: JSON.stringify({ ... }): The body property contains the data to be sent along with the request.
      // In this case, it is a JSON stringified object containing the post, userId, and tag properties. This data
      // represents the form input values that are being submitted.
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          post: post.post,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      // If the response is okay, redirect to the homepage
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
