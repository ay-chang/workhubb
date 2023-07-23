import react from "react";

const FeatureCard = ({ title, desc, img }) => {
  return (
    <div className="border border-gray-300 rounded-lg px-4 py-4 w-56">
      <div className="feature__card-img pb-4">{img}</div>
      <p className="text-sm font-base">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
};

const PostDetails = ({ post, handleSaveClick, isSaved }) => {
  return (
    <div className="page__details">
      <p className="text-3xl font-semibold pb-2">{post.title}</p>
      <div className="flex text-sm pb-10 text-gray-500">
        <p>Posted 1 hour ago •&nbsp;</p>
        <p>4 proposals •&nbsp;</p>
        <p>USA</p>
      </div>

      <div className="post__details">
        {/* ITEM: Post Description */}
        <div className="post__details-desc">
          <p className="pb-10 text-sm leading-5 whitespace-pre-wrap border-b border-gray-200">
            {post.post}
          </p>

          {/* ITEM: Post Features */}
          <div className="flex flex-col pb-10 border-b border-gray-200">
            <h1 className="pt-10 pb-6 text-xl">Job Details</h1>
            <div className="flex gap-4">
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
          </div>
          {/* ITEM: Post Tags */}
          <div>
            <h1 className="pt-10 pb-6 text-xl">Tags and Skills</h1>
            <p className="border-blue-500 rounded-full w-fit py-1 px-4 bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
              {post.tag}
            </p>
          </div>
        </div>

        {/* ITEM: Post Side Bar */}
        <div className="post__details-sidebar relative">
          <p className="apply__btn mt-5 mb-4 mx-4">Apply</p>
          {isSaved ? (
            <p onClick={handleSaveClick} className="saved__btn my-4 mx-4 text-primary-blue">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="pl-1">Saved</span>
            </p>
          ) : (
            <p onClick={handleSaveClick} className="save__btn my-4 mx-4 text-primary-blue">
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
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                />
              </svg>
              <span className="pl-1">Save</span>
            </p>
          )}
          <div className="text-left text-base pl-4 pt-4">
            <h1 className="pb-4 text-lg">Client Information</h1>
            <div className="flex flex-col text-sm gap-2">
              <p>Rating: 4.3</p>
              <p>Avg Payrate: $23.60</p>
              <p>Jobs Posted: 14</p>
              <p>Client Experience: Advanced</p>
              <p className="text-gray-500 text-xs absolute bottom-4">Member since 2019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
