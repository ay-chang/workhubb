"use client";

import PostCard from "./PostCard";
import { useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head__text text-left">
        <span>{name} Profile</span>
      </h1>
      <p className="desc text-left ">{desc}</p>
      <div className="mt-10 post__layout">
        {data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
