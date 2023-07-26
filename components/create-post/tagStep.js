"use client";

import { useState, useEffect } from "react";
import { tags } from "@utils/tags";

const TagStep = ({ handleNext, handleBack, post, setPost }) => {
  const isEmpty = post.tag === "";

  useEffect(() => {
    console.log(tags[0]);
  }, []);

  return (
    <div className="relative gap-16 flex items-start min-h-full w-full">
      <div className="w-1/2">
        <h1 className="text-5xl font-semibold pb-8">Give your post a few tags</h1>
        <p className="text-sm text-gray-500 pb-32">
          Tags are keywords that describe your post. They help others find your post, so make
          sure you choose tags that accurately describe your post.
        </p>
        <div className="flex gap-4">
          <button onClick={handleBack} className="rounded-xl border border-gray-300 px-8">
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={isEmpty}
            className={`flex rounded-xl border ${
              isEmpty
                ? "bg-muted-blue-100 text-muted-blue-300 py-2 px-8 transition ease-linear"
                : "bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-2 px-8 transition ease-linear"
            }`}
          >
            <span className="pr-4">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* ITEM: Text Box and Examples */}
      <div className="w-1/2">
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Select your tags here
        </span>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="Enter tags separated by commas"
          required
          className="form__input"
        />
      </div>
    </div>
  );
};

export default TagStep;
