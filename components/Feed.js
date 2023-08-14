"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostCard from "./PostCard";

/**
 * This file contains both the Feed and PostCardList components. The Feed component is the main component
 * that contains both the PostCardList and the search bar. It also contains the filter selectors above the
 * PostCardList that will allow the user to filter the posts based on the tag.
 *
 */

// DESCRIPTION: This component is only being used within the Feed so we can create it
// within this file and not have to create a new file for it.
const PostCardList = ({ data }) => {
  const router = useRouter();

  const handleTagClick = (tag) => {};

  return (
    <div className="mt-16 post__layout">
      {data.map((post) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
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
  const filterPosts = (searchText, mode) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search

    if (mode === "t") {
      // Filter based on tag
      return allPosts.filter((item) => item.tags.some((tag) => regex.test(tag)));
    } else if (mode === "a") {
      // Filter based on any property: username, tag, or post
      return allPosts.filter(
        (item) =>
          regex.test(item.creator.username) ||
          item.tags.some((tag) => regex.test(tag)) ||
          regex.test(item.post)
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
        <button className="absolute lg:right-18% right-2% text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
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
