"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostCard from "@components/PostCard";

const SavedPosts = () => {
  // const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session.user.id}/saved-posts`);
      const data = await response.json();
      setPosts(data);
      console.log(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  return (
    <div>
      Saved posts
      <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;
