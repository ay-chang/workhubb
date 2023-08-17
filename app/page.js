import React from "react";
import Feed from "@components/Feed";
import TestFeed from "@components/testFeed";

const Home = () => {
  return (
    <section className="w-full flex-col flex-left">
      <h1 className="head__text text-left">
        Welcome to the&nbsp;
        <span className="blue__gradient">Work Hubb</span>
      </h1>
      <p className="desc text-left">
        This is a platform designed to help freelancers find work and to help customers
        creating work to pick the right price for them!
      </p>
      <TestFeed />
      {/* <Feed /> */}
    </section>
  );
};

export default Home;
