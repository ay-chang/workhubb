"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * This is the Form component used for creating a new post and editing an existing post.
 *
 * TODO:
 * Make own css and tailwind customizations
 *
 * - customize h1 tag for Create Post
 * - redesign the form box from glasssmoprhism
 * - edit description
 * - Better understand how this file works
 *
 * REMINDER: The deconstructed props object parameters are taken in from the other file. This means post comes
 * from another file and setPost comes from another file, we are just using it in this file which is eventually
 * sent back to the other file that uses the Form component.
 *
 */

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [activeButton, setActiveButton] = useState(""); // state for the active amount button

  const amountOptions = ["< $50", "$50 - $100", "$100 - $200", "$200 - $500", "> $500"];

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head__text text-left">
        <span>{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">{type} a job posting to the WorkHubb community</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/** Job title input box */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Give your job a title
          </span>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Job title"
            required
            className="form__input"
          />
        </label>

        {/** Main job description text box */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Enter your job description here
          </span>
          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder="Type here"
            required
            className="form__textarea"
          />
        </label>

        {/** Tags input box */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tags
            <span className="font-normal">
              {` `}(#webdev, # graphicdesign, #marketing, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tags"
            required
            className="form__input"
          />
        </label>

        {/** Amount button selection */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Select Amount Range
            <span className="flex pt-2 gap-6 text-xs font-light">
              {amountOptions.map((option) => (
                <p
                  key={option}
                  onClick={() => {
                    setPost({ ...post, amount: option });
                    setActiveButton(option);
                  }}
                  className={`amount__btn ${activeButton === option ? "active" : ""}`}
                >
                  {option}
                </p>
              ))}
            </span>
          </span>
        </label>

        {/** Submit and cancel buttons */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm rounded-full"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
