import React from "react";

const start = ({ handleNext }) => {
  return (
    <div className="relative gap-16 flex items-start min-h-full">
      <div className="w-1/2">
        <h1 className="text-5xl font-semibold pb-8">
          Making a Job Post is Easy with WorkHubb
        </h1>
      </div>

      {/* ITEM: Steps */}
      <div className="w-1/2">
        <div>
          <div className="text-2xl font-semibold pb-4">
            1<span className="pl-4">Tell us about your job posting</span>
          </div>
          <p className="text-gray-500 text-base pb-10 border-b border-gray-200 mb-10 pl-8">
            Give your job posting a title, and a description letting people know what you want
          </p>
        </div>
        <div>
          <div className="text-2xl font-semibold pb-4">
            2<span className="pl-4">Give your job a few details</span>
          </div>
          <p className="text-gray-500 text-base pb-10 border-b border-gray-200 mb-10 pl-8">
            Let people know what your budget is, how long the project will take, and the skills
            you're looking for
          </p>
        </div>
        <div>
          <div className="text-2xl font-semibold pb-4">
            3<span className="pl-4">Review and Publish your Post</span>
          </div>
          <p className="text-gray-500 text-base pb-10 border-b border-gray-200 mb-12 pl-8">
            Finally, make sure everything lookay okay and publish your post for people to see
          </p>
        </div>
        <button
          onClick={() => {
            handleNext();
          }}
          className="flex rounded-xl border border-blue-500 bg-gradient-to-r from-primary-blue to-secondary-blue text-white py-2 px-8"
        >
          <span className="pr-4">Get Started</span>
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
  );
};

export default start;
