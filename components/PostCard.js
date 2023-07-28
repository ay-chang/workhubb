"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// TODO: In the profile page, hide edit and delete button and use them as a dropdown menu

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // When post title is clicked send the user to the PostDetails page
  const handleCardClick = (post) => {
    router.push(`/post-details?id=${post._id}`);
  };

  return (
    <div className="post__card relative">
      {/* Checking if currenetly logged in user is the creator of the PostCard and checking if they are on the profile page */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 absolute top-0 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={() => setToggleDropdown((prev) => !prev)}
            className="w-6 h-6 absolute cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
            />
          </svg>

          {/* Dropdown menu */}
          {toggleDropdown && (
            <div className="dropdown pr-0">
              <p className="font-inter text-sm cursor-pointer pr-0" onClick={handleEdit}>
                Edit
              </p>
              <p className="font-inter text-sm cursor-pointer pr-0" onClick={handleDelete}>
                Delete
              </p>
            </div>
          )}
        </div>
      )}

      {/* Section with image, username, and email **/}
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
      <p className="text-xs border border-gray-300 rounded-lg text-center inline-block py-1 px-2 my-2">
        {post.amount}
      </p>

      {/* FIXME: The button and line layout is all messed up**/}
      <div className="my-2 font-santoshi text-xs text-gray-700 cursor-pointer flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <p className="tag__btn">#{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
