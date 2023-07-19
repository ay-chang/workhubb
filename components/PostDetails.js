import React from "react";

const PostDetails = ({ post }) => {
  return (
    <div className="page__details">
      <p className="text-xl font-base pb-10">Job Details</p>
      <div className="post__details ">
        <div className="post__details-desc">
          <h1 className="text-5xl font-bold pb-10">{post.title}</h1>
          <p className="pb-10">{post.post}</p>
          <p className="pb-10">{post.tag}</p>
          <p className="pb-10">{post.amount}</p>
        </div>

        {/* Post Side Bar */}
        <div className="post__details-sidebar border-l border-gray-200 pl-10">
          <p className="outline__btn mb-4">Apply</p>
          <p className="outline__btn">Save</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
