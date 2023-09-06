"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

import StartStep from "../../components/create-post/StartStep";
import TitleStep from "@components/create-post/TitleStep";
import DescriptionStep from "@components/create-post/DescriptionStep";
import TagStep from "@components/create-post/TagStep";
import ReviewStep from "@components/create-post/ReviewStep";
import AmountStep from "@components/create-post/AmountStep";

const CreatePost = () => {
  const [post, setPost] = useState({ title: "", post: "", tags: [], amount: "" }); // state for post details
  const [submitting, setSubmitting] = useState(false); // state for submitting form

  // Page States
  const steps = [
    "startStep",
    "titleStep",
    "descriptionStep",
    "amountStep",
    "tagStep",
    "reviewStep",
  ];
  const [currentStep, setCurrentStep] = useState("startStep");

  const router = useRouter(); // router object
  const { data: session } = useSession(); // session object

  // DESCRIPTION: Make a POST request to the API which is in MongoDB
  const createPost = async (e) => {
    // e.preventDefault();
    setSubmitting(true);

    try {
      // The URL that the request is sent to is api/post/new, this is defined in the post/new/route.js file.
      // The second argument to the fetch function is an options object that configures
      // the request. In this case, it includes the following properties:
      // 1. method: "POST": Specifies the HTTP method of the request as POST.
      // 2. body: JSON.stringify({ ... }): The body property contains the data to be sent along with the request.
      // In this case, it is a JSON stringified object containing the post, userId, and tag properties. This data
      // represents the form input values that are being submitted.
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          post: post.post,
          userId: session?.user.id,
          tags: post.tags,
          amount: post.amount,
        }),
      });

      // If the response is okay, redirect to the homepage
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div>
      {currentStep === "startStep" && <StartStep handleNext={() => handleNext("titleStep")} />}
      {currentStep === "titleStep" && (
        <TitleStep
          handleNext={() => handleNext("descriptionStep")}
          handleBack={() => handleNext("startStep")}
          post={post}
          setPost={setPost}
        />
      )}
      {currentStep === "descriptionStep" && (
        <DescriptionStep
          handleNext={() => handleNext("amountStep")}
          handleBack={() => handleNext("titleStep")}
          post={post}
          setPost={setPost}
        />
      )}
      {currentStep === "amountStep" && (
        <AmountStep
          handleNext={() => handleNext("tagStep")}
          handleBack={() => handleNext("descriptionStep")}
          post={post}
          setPost={setPost}
        />
      )}
      {currentStep === "tagStep" && (
        <TagStep
          handleNext={() => handleNext("reviewStep")}
          handleBack={() => handleNext("amountStep")}
          post={post}
          setPost={setPost}
        />
      )}
      {currentStep === "reviewStep" && (
        <ReviewStep
          handleSubmit={handleSubmit}
          handleBack={() => handleNext("tagStep")}
          post={post}
        />
      )}
    </div>
  );
};

export default CreatePost;
