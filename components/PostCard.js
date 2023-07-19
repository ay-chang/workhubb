"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// TODO: In the profile page, hide edit and delete button and use them as a dropdown menu

const PostCard = ({ post, handleTagClick, handleCardClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="post__card relative">
      {/* Section with imgage, username, and email **/}
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

      {/* Section with job title, job description, and tags **/}
      <p
        onClick={() => handleCardClick && handleCardClick(post)}
        className="mt-6 font-santoshi text-lg font-semibold text-gray-800 cursor-pointer line-clamp-1"
      >
        {post.title}
      </p>
      <p
        onClick={() => handleCardClick && handleCardClick(post)}
        className="my-2 font-santoshi text-sm text-gray-700 cursor-pointer line-clamp-4"
      >
        {post.post}
      </p>
      <p className="text-xs border border-gray-300 rounded-lg text-center inline-block py-1 px-2 absolute bottom-16">
        {post.amount}
      </p>
      <p
        className="font-inter text-sm cursor-pointer text-blue-500 absolute bottom-5"
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
