"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // lets us navigate to different pages

import Form from "@components/Form";

const EditPost = () => {
  const router = useRouter(); // router object
  const searchParams = useSearchParams(); // search params object
  const postId = searchParams.get("id"); // get the id from the search params

  const [submitting, setSubmitting] = useState(false); // state for submitting form
  const [post, setPost] = useState({ post: "", tag: "", title: "", amount: "" }); // state for post details

  // Fetches the existing post details and inputs into the fields from the API, only runs when the postId changes
  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      setPost({
        title: data.title,
        post: data.post,
        tag: data.tag,
        amount: data.amount,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  // Make a PATCH request to the API which is in MongoDB
  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Post ID not found");

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          post: post.post,
          tag: post.tag,
          amount: post.amount,
        }),
      });

      // If the response is okay, redirect to the homepage
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default EditPost;
