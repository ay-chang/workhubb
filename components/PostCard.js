"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// FIXME: At the moment to access the post details, you have to use post.post..., find a way
// to fix this and chang it so it only needs post... This could maybe be an issue with the post
// schema or maybe how the data is sent from Feed.js to PostCard.js ✅
const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="post__card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-santoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>
      </div>

      <p className="my-4 font-santoshi text-sm text-gray-700">{post.post}</p>
      <p
        className="font-inter text-sm cursor-pointer text-blue-500"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {/* Checking if currenetly logged in user is the creator of the PostCard and checking if they are on the profile page */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PostCard;
