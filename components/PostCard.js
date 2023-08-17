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
    <div className="post__card relative overflow-hidden">
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

      {/* ITEM: Section with job title, job description, and tags **/}
      <div className="">
        {/* ITEM: Post Title */}
        <p
          onClick={() => handleCardClick && handleCardClick(post)}
          className="font-santoshi text-lg font-semibold text-gray-800 cursor-pointer line-clamp-1"
        >
          {post.title}
        </p>

        {/* ITEM: Post metadata */}
        <div className="flex text-sm pb-2 text-gray-500">
          <p>Posted 1 hour ago •&nbsp;</p>
          <p>4 proposals •&nbsp;</p>
          <p>USA</p>
        </div>

        {/* ITEM: Post Description */}
        <p
          onClick={() => handleCardClick && handleCardClick(post)}
          className="my-2 font-santoshi text-sm text-gray-700 cursor-pointer line-clamp-4"
        >
          {post.post}
        </p>
        <p className="text-sm text-blue-500 pb-4">View more</p>

        {/* ITEM: FIXME: The button and line layout is all messed up**/}
        <div className="font-santoshi text-xs text-gray-700 cursor-pointer flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <p className="tag__btn">#{tag}</p>
          ))}
        </div>

        {/* ITEM: Post Features */}
        <div className="flex text-xs items-center gap-2">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              class="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
              />
            </svg>

            <p>Payment Verified</p>
          </div>
          <p className="text-xs border border-gray-300 rounded-lg text-center inline-block py-1 px-2 my-2">
            {post.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
