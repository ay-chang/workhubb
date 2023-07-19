"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // DESCRIPTION: This function will fetch the posts from the API that match with the session user id
    // and set the posts state to the data returned from the API. response is fetched from the
    // api/users/[id]/posts route.
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        const response = fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch {
        console.error("The Error: " + error);
      }
    }
  };

  // console.log(posts);

  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personanlized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
