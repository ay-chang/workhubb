"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation"; // lets us navigate to different pages
import { CreatePostProvider } from "@app/create-post/postContext"; // Our created context for post details

import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter(); // router object

  return (
    <CreatePostProvider>
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
              Give your job posting a title, and a description letting people know what you
              want
            </p>
          </div>
          <div>
            <div className="text-2xl font-semibold pb-4">
              2<span className="pl-4">Give your job a few details</span>
            </div>
            <p className="text-gray-500 text-base pb-10 border-b border-gray-200 mb-10 pl-8">
              Let people know what your budget is, how long the project will take, and the
              skills you're looking for
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
              router.push("/create-post/step-1");
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
    </CreatePostProvider>
  );
};

export default CreatePost;

// const CreatePost = () => {
//   const router = useRouter(); // router object
//   const { data: session } = useSession(); // session object

//   const [submitting, setSubmitting] = useState(false); // state for submitting form
//   const [post, setPost] = useState({ title: "", post: "", tag: "", amount: "" }); // state for post details

//   // Make a POST request to the API which is in MongoDB
//   const createPost = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       // The URL that the request is sent to is api/post/new, this is defined in the post/new/route.js file.
//       // The second argument to the fetch function is an options object that configures
//       // the request. In this case, it includes the following properties:
//       // 1. method: "POST": Specifies the HTTP method of the request as POST.
//       // 2. body: JSON.stringify({ ... }): The body property contains the data to be sent along with the request.
//       // In this case, it is a JSON stringified object containing the post, userId, and tag properties. This data
//       // represents the form input values that are being submitted.
//       const response = await fetch("/api/post/new", {
//         method: "POST",
//         body: JSON.stringify({
//           title: post.title,
//           post: post.post,
//           userId: session?.user.id,
//           tag: post.tag,
//           amount: post.amount,
//         }),
//       });

//       // If the response is okay, redirect to the homepage
//       if (response.ok) {
//         router.push("/");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Form
//       type="Create"
//       post={post}
//       setPost={setPost}
//       submitting={submitting}
//       handleSubmit={createPost}
//     />
//   );
// };

// export default CreatePost;
