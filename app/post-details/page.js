"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; // lets us navigate to different pages
import PostDetails from "@components/PostDetails";

const PageDetails = () => {
  const [post, setPost] = useState({ post: "", tag: "", title: "", amount: "" }); // state for post details
  const [saved, setSaved] = useState(false); // state for whether the post is saved or not

  const { data: session } = useSession(); // session object
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

    // check if the post is saved, you need this line (setSaved(checkIf...)) because its sending a response rather than
    // the state just changing as a simple boolean
    if (postId) getPostDetails();
    setSaved(checkIfSaved().then((res) => setSaved(res)));
  }, [postId]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${session.user.id}/saved-posts`, {
        method: "PATCH",
        body: JSON.stringify({
          postId: postId,
        }),
      });

      if (response.ok) setSaved((prevSaved) => !prevSaved); // if the response is ok, toggle the saved state
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfSaved = async () => {
    try {
      const response = await fetch(`/api/users/${session.user.id}/saved-posts`);
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        if (data[i]._id == postId) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  };

  const handleApply = () => {};

  return (
    <div>
      <PostDetails post={post} handleSaveClick={handleSave} isSaved={saved} />
    </div>
  );
};

export default PageDetails;
