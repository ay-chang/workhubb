import React from "react";

const TitleStep = ({ handleNext, handleBack, post, setPost }) => {
  const isEmpty = post.title.trim() === "";
  const tooLong = post.title.trim().length > 200;
  const tooShort = post.title.trim().length < 5;

  return (
    <div className="relative gap-16 flex items-start min-h-full w-full">
      <div className="w-1/2">
        <h1 className="text-5xl font-semibold pb-8">
          Start by giving your post a strong title
        </h1>
        <p className="text-sm text-gray-500 pb-32">
          Your job post's title is the gateway to attracting the perfect candidates for your
          position. It's the first impression that sets the tone for the entire job
          description. Let's make it count and stand out from the crowd!
        </p>
        <div className="flex gap-4">
          <button onClick={handleBack} className="rounded-xl border border-gray-300 px-8">
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={isEmpty || tooLong || tooShort}
            className={`flex rounded-xl  ${
              isEmpty || tooLong || tooShort
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
          Write your title here
        </span>
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Job title"
          required
          className="form__input"
        />
        <div className="py-8 text-sm">
          <h1 className="text-base font-semibold pb-2">Examples of Good titles</h1>
          <ul>
            <p className="pb-0 pl-2">
              • Responsive WordPress Site with Booking & Payment Functionality
            </p>
            <p className="pb-0 pl-2">• Graphic Designer for Multiple Campaign Ad Creatives</p>
            <p className="pb-0 pl-2">• Facebook Ad Specialist for Product Launch</p>
            <p className="pb-0 pl-2">
              • Experienced Frontend Developer for Innovative Web Applications
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TitleStep;
