"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostCard from "./PostCard";

/**
 * This file contains both the Feed and PostCardList components. The Feed component is the main component
 * that contains both the PostCardList and the search bar. It also contains the filter selectors above the
 * PostCardList that will allow the user to filter the posts based on the tag.
 *
 * TODO:
 * - Add filter selectors
 * - Figure out how to use an .SVG
 */

// This component is only being used within the Feed so we can create it
// within this file and not have to create a new file for it.
const PostCardList = ({ data }) => {
  const router = useRouter();

  const handleTagClick = (tag) => {};

  // When post title is clicked send the user to the PostDetails page
  const handleCardClick = (post) => {
    router.push(`/post-details?id=${post._id}`);
  };

  return (
    <div className="mt-16 post__layout">
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

// This is the filters bar that sits right above the PostCards. It will allow the user to filter through posts by tags and
// other parameters which will be added later.
const FilterBar = ({ setSearchedResults, setDisplayedPosts, filterPosts }) => {
  const [activeButton, setActiveButton] = useState(""); // string, state for the active filter button

  const filterOptions = [
    { label: "#webdev", value: "webdev" },
    { label: "#app", value: "app" },
    { label: "#design", value: "design" },
    { label: "#writing", value: "writing" },
    { label: "#socialmedia", value: "socialmedia" },
  ];

  return (
    <div className="filter__bar">
      <button className="outline__btn flex gap-2">
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
        Filter
      </button>
      <p
        onClick={() => {
          setActiveButton("all");
          setSearchedResults(filterPosts("all", "a"));
          setDisplayedPosts(filterPosts("all", "a"));
        }}
        className={`outline__btn ${activeButton === "all" ? "active" : ""}`}
      >
        All Posts
      </p>
      {filterOptions.map((option) => (
        <p
          key={option.value}
          onClick={() => {
            setActiveButton(option.value);
            setSearchedResults(filterPosts(option.value, "t"));
            setDisplayedPosts(filterPosts(option.value, "t"));
          }}
          className={`outline__btn ${activeButton === option.value ? "active" : ""}`}
        >
          {option.label}
        </p>
      ))}
    </div>
  );
};

// This is the main Feed component that contains the PostCardList and the search bar. It also uses the FilterBar component as well
// as the PostCardList component.
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]); // array, state for all the posts. Only used on initial load

  // Search states
  const [searchedResults, setSearchedResults] = useState([]); // array, state for the posts that will be filtered based on the search text
  const [searchText, setSearchText] = useState(""); // string state for the text within the search input,
  const [displayedPosts, setDisplayedPosts] = useState(allPosts); // state to hold the currently displayed posts

  const [searchTimeout, setSearchTimeout] = useState(null); // timeout state for the debounce method

  // This effect will run once when the component is mounted and will fetch all the posts from the API
  // and add posts to the posts array state. This is simplyg retreiving all posts.
  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    setAllPosts(data);
    setDisplayedPosts(data);
    setSearchedResults(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // DESCRIPTION: Search for posts based on the search text and return the results. The search bar uses regex to match what
  // the user is typing to the username, tag, or post.
  const filterPosts = (searchtext, mode) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    if (mode === "t") {
      return allPosts.filter((item) => regex.test(item.tag));
    } else if (mode === "a") {
      return allPosts.filter(
        (item) =>
          regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.post)
      );
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTimeout(
      // create artificial loading time
      setTimeout(() => {
        const searchResult = filterPosts(searchText, "a");
        setSearchedResults(searchResult);
        setDisplayedPosts(searchResult); // Update the displayed posts with the search results
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form onSubmit={handleSearchSubmit} className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for posts, tags, or usernames"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search__input peer"
        />
      </form>

      <FilterBar
        setSearchedResults={setSearchedResults}
        setDisplayedPosts={setDisplayedPosts}
        filterPosts={filterPosts}
      />

      {searchText ? (
        <PostCardList data={searchedResults} />
      ) : (
        <PostCardList data={displayedPosts} />
      )}
    </section>
  );
};

export default Feed;
