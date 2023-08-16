"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation"; // lets us navigate to different pages

import Apply from "@components/Apply";

const ApplyPage = () => {
  const [post, setPost] = useState({ post: "", tags: [], title: "", amount: "" }); // state for post details
  const [applicationDetails, setApplicationDetails] = useState({
    coverletter: "",
    pastExperience: "",
    projectPlan: "",
    rate: 0,
    weeks: 0,
  }); // state for application details

  const { data: session } = useSession(); // session object
  const searchParams = useSearchParams(); // search params object
  const postId = searchParams.get("id"); // get the id from the search params

  // DESCRIPTION: Fetches the existing post details from the API, only runs when the postId changes
  // When the PostCard title is clicked, the current url will be set to .../post-details?id=...
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
        tags: data.tags,
        amount: data.amount,
      });
    };

    getPostDetails();
  }, [postId]);

  return (
    <div className="w-full">
      <Apply
        post={post}
        applicationDetails={applicationDetails}
        setApplicationDetails={setApplicationDetails}
      />
    </div>
  );
};

export default ApplyPage;
