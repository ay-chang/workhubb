"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"; // lets us navigate to different pages
import PostDetails from "@components/PostDetails";

/**
 * NOTE: This is the page that displays the post details and allows the user to either apply or save the
 * post to theirsaved posts section in their profile. This page is called when a user clicks on one of the post
 * cards either in feed or elsewhere. This file has to fetch for the post details from "/api/post/${postId}"
 * which is also the route used for retreiving post details for other components. This file also sends a PATCH
 * requests that updates the saved-posts array within the dataset by adding the saved posts. Additionally the
 * file also checks for whether or not the post is saved so that it can set the state of the saved button to either
 * activer or inactive.
 */

const PageDetails = () => {
  const [post, setPost] = useState({ post: "", tags: [], title: "", amount: "" }); // state for post details
  const [saved, setSaved] = useState(false); // state for whether the post is saved or not

  const { data: session } = useSession(); // session object
  const router = useRouter(); // router object
  const searchParams = useSearchParams(); // search params object
  const postId = searchParams.get("id"); // get the id from the search params

  // DESCRIPTION: Fetches the existing post details from the API, only runs when the postId changes
  // When the PostCard title is clicked, the current url will be set to .../post-details?id=...
  // which is when this PageDetails file is called. Immediately the useEffect is run to fetch
  // the post details. This /api/post/${postId} is what calls the route.js file within api/post/[id]
  // that fetches this data from the database.
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const response = await fetch(`/api/post/${postId}`);
        const data = await response.json();
        setPost({
          title: data.title,
          post: data.post,
          tags: data.tags,
          amount: data.amount,
        });
        console.log("Set Post Details");
      } catch (error) {
        console.error(error);
      }
    };

    if (postId) {
      getPostDetails();
    }
  }, []);

  // DESCRIPTION: Imediately check if the post is saved to set the saved state
  useEffect(() => {
    const checkIfSavedAndSetState = async () => {
      if (session && postId) {
        const isSaved = await checkIfSaved();
        setSaved(isSaved);
      }
    };

    checkIfSavedAndSetState();
  }, [session, postId]);

  // DESCRIPTION: The function sends a GET request to the /api/post/${postId} route which fetches the post details
  const handleApply = () => {
    router.push(`/apply?id=${postId}`);
  };

  // DESCRIPTION: The function sends a PATCH request to update the saved-posts array within the dataset, it updates the array by
  // adding another post to the array by its postID
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

  // DESCRIPTION: Sends a GET request to retrive the posts that are in the saved-posts array within the dataset and then interate
  // through them to check if the current post we are in, if that id matches with one of the ID's in the saved-posts array.
  // if so then return true, else return false.
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

  return (
    <div>
      <PostDetails
        post={post}
        handleSaveClick={handleSave}
        handleApplyClick={handleApply}
        isSaved={saved}
      />
    </div>
  );
};

export default PageDetails;
