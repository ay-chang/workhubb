import React from "react";

const DescriptionStep = ({ handleNext, handleBack, post, setPost }) => {
  const isEmpty = post.post === "";
  const tooLong = post.post.length > 5000;
  const tooShort = post.post.length < 10; // REMINDER: Set this back to 50

  return (
    <div className="relative gap-16 flex items-start min-h-full w-full">
      <div className="w-1/2">
        <h1 className="text-5xl font-semibold pb-8">Tell people about your project</h1>
        <p className="text-sm text-gray-500 pb-32">
          Introduce Your Vision! In the project description, clearly articulate your goals,
          objectives, and what sets your project apart. Highlight its unique value proposition
          to attract potential collaborators who share your vision. Craft a compelling and
          concise description that captures attention. Avoid jargon and use a conversational
          tone to make it easy for others to connect with your vision and get excited about
          joining your project.
        </p>
        <div className="flex gap-4">
          <button onClick={handleBack} className="rounded-xl border border-gray-300 px-8">
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={isEmpty || tooLong || tooShort}
            className={`flex rounded-xl ${
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
          Describe your project
        </span>
        <textarea
          value={post.post}
          onChange={(e) => setPost({ ...post, post: e.target.value })}
          placeholder="Type here"
          required
          className="form__textarea mb-8"
        />
      </div>
    </div>
  );
};

export default DescriptionStep;
