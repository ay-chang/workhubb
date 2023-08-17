import React from "react";
import Feed from "@components/Feed";
import TestFeed from "@components/testFeed";

const Home = () => {
  return (
    <section className="w-full flex-col flex-center">
      <h1 className="head__text text-center">
        Welcome to the <br className="max-md:hidden" />
        <span className="text-center blue__gradient">Work Hubb</span>
      </h1>
      <p className="desc text-center">
        This is a platform designed to help freelancers find work and to help customers
        creating work to pick the right price for them!
      </p>
      <TestFeed />
      {/* <Feed /> */}
    </section>
  );
};

export default Home;
