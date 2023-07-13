import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head__text text-center">
        Welcome to the <br className="max-md:hidden" />
        <span className="text-center">Work Hubb</span>
      </h1>
      <p className="desc text-center">
        This is a platform designed to help freelancers find work and to help customers
        creating work to pick the right price for them!
      </p>
      <Feed />
    </section>
  );
};

export default Home;
