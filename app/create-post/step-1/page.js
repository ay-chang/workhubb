"use client";

import { useState } from "react";
import { useSession } from "next-auth/react"; // lets us know which user is currently logged in
import { useCreatePostContext } from "../postContext";

const Step1 = () => {
  const { userId, setUserId } = useCreatePostContext();
  // const { post, setPost } = useCreatePostContext(); // post object
  const { data: session } = useSession(); // session object

  return (
    <div className="relative gap-16 flex items-start min-h-full w-full">
      <div className="w-1/2">
        <h1 className="text-5xl font-semibold pb-8">
          Start by giving your post a strong title
        </h1>
        <p className="text-sm text-gray-500">
          Your job post's title is the gateway to attracting the perfect candidates for your
          position. It's the first impression that sets the tone for the entire job
          description. Let's make it count and stand out from the crowd!
        </p>
      </div>

      {/* ITEM: Text Box and Examples */}
      <div className="w-1/2">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Write your title here
          </span>
          {/* <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Job title"
            required
            className="form__input"
          /> */}
          <div className="pt-8 text-sm">
            <h1 className="text-base font-semibold pb-2">Examples of Good titles</h1>
            <ul>
              <p className="pb-0 pl-2">
                • Responsive WordPress Site with Booking & Payment Functionality
              </p>
              <p className="pb-0 pl-2">
                • Graphic Designer for Multiple Campaign Ad Creatives
              </p>
              <p className="pb-0 pl-2">• Facebook Ad Specialist for Product Launch</p>
              <p className="pb-0 pl-2">
                • Experienced Frontend Developer for Innovative Web Applications
              </p>
            </ul>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Step1;
