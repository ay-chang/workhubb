"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // lets us navigate to different pages
import PostDetails from "@components/PostDetails";

const PageDetails = () => {
  const [post, setPost] = useState({ post: "", tag: "", title: "", amount: "" }); // state for post details
  const searchParams = useSearchParams(); // search params object
  const postId = searchParams.get("id"); // get the id from the search params

  // REMINDER: Fetches the existing post details from the API, only runs when the postId changes
  // When the PostCard title is clicked, the current url will be at .../post-details?id=...
  // which is when this PageDetails file is called. Immediately the useEffect is run to fetch
  // the post details. This /api/post/${postId} is what calls the route.js file within api/post/[id]
  // that fetches this data from the database.
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

  const handleApply = () => {};

  const handleSave = () => {};

  return (
    <div>
      <PostDetails post={post} />
    </div>
  );
};

export default PageDetails;
