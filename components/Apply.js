import React from "react";

const FeatureCard = ({ title, desc, img }) => {
  return (
    <div className={`flex px-4 py-2 w-full gap-4 items-start`}>
      <div className="feature__card-img pb-4">{img}</div>
      <div>
        <p className="text-sm font-base">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
    </div>
  );
};

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
          <p className="text-xl">{post.title}</p>
          <div className="flex text-xs pb-4 text-gray-500">
            <p>Posted 1 hour ago •&nbsp;</p>
            <p>4 proposals •&nbsp;</p>
            <p>USA</p>
          </div>
          <p className="text-sm line-clamp-6 mb-4">{post.post}</p>
          <p className="text-blue-500 text-sm pb-4">View More</p>

          {/* ITEM: Feature Cards */}
          <div className="flex flex-col border-l mb-6 border-gray-300">
            <FeatureCard
              title="Intermediate"
              desc="Experience Level"
              img={
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
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
              }
            />
            <FeatureCard
              title="Less than 30 hours a week"
              desc="Hourly"
              img={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <FeatureCard
              title="$20.00 - $30.00 / hr"
              desc="Hourly Rate"
              img={
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
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
              }
            />
          </div>

          {/* ITEM: Tags and Skills */}
          <div className="pb-4">
            <p className="pb-2">Tags and Skills</p>
            <div className="flex flex-wrap gap-1 w-full">
              {post.tags.map((tag) => (
                <p className="tag__btn">{tag}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apply;
