"use client";

import { useState, useEffect } from "react";
import { tags } from "@utils/tags";

const TagStep = ({ handleNext, handleBack, post, setPost }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchText, setSearchText] = useState("");

  const isEmpty = searchText === "";
  const isSelectedTagsEmpty = selectedTags.length === 0;

  // When a tag is clicked, add it to the selected tags section. If a tag is already selected and is clicked
  // then the tag is removed. Additionally, the post.tag array is updated to reflect the selected tags.
  const handleTagClick = (tag) => () => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      post.tags.push(tag);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      post.tags.pop(tag);
    }
    setSearchText("");
  };

  // The tags that are displayed are filtered using regex
  const filteredTags = tags.filter((tag) => {
    const regex = new RegExp(`^${searchText}`, "i"); // 'i' flag for case-insensitive search
    return regex.test(tag);
  });

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
            disabled={isSelectedTagsEmpty}
            className={`flex rounded-xl ${
              isSelectedTagsEmpty
                ? "bg-muted-blue-200 text-muted-blue-400 py-2 px-8 transition ease-linear"
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter tags separated by commas"
          required
          className={`form__input ${isEmpty ? "" : ""}`}
        />
        {!isEmpty && (
          <div className="text-left px-2 flex flex-wrap gap-2 pt-4">
            {filteredTags.map((tag) => (
              <div
                onClick={handleTagClick(tag)}
                className="rounded-full py-1 px-4 text-xs cursor-pointer flex items-center gap-1 bg-muted-blue-200 hover:bg-muted-blue-300"
              >
                <p key={tag} className="">
                  {tag}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* ITEM: Selected Tags */}
        <div className="pt-8">
          <h1 className="pb-4">Selected Tags</h1>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <div
                onClick={handleTagClick(tag)}
                className="rounded-full py-1 px-4 text-xs cursor-pointer flex items-center gap-1 bg-gradient-to-r from-primary-blue to-secondary-blue text-white"
              >
                <p className="">{tag}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagStep;
