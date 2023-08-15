import React from "react";

const Apply = ({ post, applicationDetails, setApplicationDetails }) => {
  return (
    <div className="w-full">
      <h1 className="text-3xl text font-semibold pb-8">Apply to this job!</h1>

      <div className="flex gap-16">
        {/* Application Details */}
        <div className="w-2/3">
          {/* Introduction and Relevant Background */}
          <div className="w-full border-b pb-8 border-gray-200">
            <h1 className="text-xl pb-8">Introduction and Relevant Background</h1>
            {/* ITEM: Cover Letter */}
            <div className="pb-4">
              <p className="text-sm">Cover Letter</p>
              <textarea
                value={applicationDetails.coverletter}
                onChange={(e) =>
                  setApplicationDetails({
                    ...applicationDetails,
                    coverletter: e.target.value,
                  })
                }
                placeholder="Type here"
                required
                className="apply__form__textarea"
              />
            </div>
            {/* ITEM: Past Experience */}
            <div className="pb-4">
              <p className="text-sm">Past Experience with similar Projects</p>
              <textarea
                value={applicationDetails.pastExperience}
                onChange={(e) =>
                  setApplicationDetails({
                    ...applicationDetails,
                    pastExperience: e.target.value,
                  })
                }
                placeholder="Type here"
                required
                className="apply__form__textarea"
              />
            </div>
          </div>
        </div>

        {/* Post Details */}
        <div className="w-1/3 border border-gray-300 pt-5 px-4 rounded-xl shadow">
          <h1 className="pb-8 text-2xl">Job Details</h1>
          <p className="text-lg pb-2">{post.title}</p>
          <p className="text-sm text-gray-500 line-clamp-6 mb-8">{post.post}</p>
        </div>
      </div>
    </div>
  );
};

export default Apply;
