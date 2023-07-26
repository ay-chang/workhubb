import React from "react";

const ReviewStep = ({ post, handleSubmit, handleBack }) => {
  return (
    <div className="min-w-full">
      <h1 className="text-xl font-base pb-8 min-w-full">Review your post</h1>
      <p className="text-4xl font-semibold border-b border-gray-200 pb-8 mb-8">{post.title}</p>
      <p className="text-sm leading-5 whitespace-pre-wrap border-b border-gray-200 pb-8 mb-8">
        {post.post}
      </p>
      <div className="border-b gray-200 pb-8 mb-8">
        <p className="pb-4 font-semibold">Tags:</p>
        <p className="tag__btn text-sm">{post.tag}</p>
      </div>
      <div className="pb-32">
        <p className="pb-4 font-semibold">Budget</p>
        <p className="text-sm">{post.amount}</p>
      </div>
      {/* ITEM: Bottom Options */}
      <div className="w-full flex justify-between">
        <button onClick={handleBack} className="rounded-xl border border-gray-300 px-8">
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="rounded-xl border border-blue-500 bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-2 px-8"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
