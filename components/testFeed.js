"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
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
const testFeed = () => {
  const [allPosts, setAllPosts] = useState([]); // array, state for all the posts. Only used on initial load
  const [online, setOnline] = useState(true); // boolean, state for the user's status

  // Search states
  const [searchedResults, setSearchedResults] = useState([]); // array, state for the posts that will be filtered based on the search text
  const [searchText, setSearchText] = useState(""); // string state for the text within the search input,
  const [displayedPosts, setDisplayedPosts] = useState(allPosts); // state to hold the currently displayed posts

  // Timeout State
  const [searchTimeout, setSearchTimeout] = useState(null); // timeout state for the debounce method

  const { data: session } = useSession(); // uses current session to check if user is logged in

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
      {/* Main Feed */}
      <div className="w-3/4">
        {/* ITEM: Search bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            placeholder="Search for posts, tags, or usernames"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            required
            className="search__input peer"
          />
          <button className="absolute right-2 top-2 text-gray-400">
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
      </div>

      {/* ITEM: Sidebar */}
      <div className="w-3/10 text-sm">
        {/* ITEM: Profile */}
        <div className="border border-gray-300 rounded-xl px-4 py-8 text-left mb-4">
          <div className="flex items-center pb-8">
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className="rounded-full cursor-pointer"
              alt="profile"
            />
            <div className="flex flex-col text-left pl-2">
              <p className="line-clamp-1 text-base">{session?.user.name}</p>
              <p className="text-gray-500 line-clamp-1 text-sm">{session?.user.email}</p>
            </div>
          </div>
          {/* ITEM: Profile stats, bio, notifications */}
          <p className="line-clamp-2 text-sm mb-4">
            Web Developer | AI Engineer | 10+ years of experience with software development
          </p>

          {/* ITEM: Rating */}
          <div className="flex text-gray-200 items-center pb-4">
            <p className="text-sm text-black pr-2">Rating: </p>
            {[...Array(5)].map((star, i) => {
              return (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="0"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              );
            })}
          </div>

          {/* ITEM: Status */}
          <div className="flex border-2 border-gray-300 rounded-full justify-between">
            <button
              onClick={() => setOnline(true)}
              className={`text-base font-normal rounded-full px-4 py-2 w-1/2 ${
                online ? "border border-blue-500 bg-blue-500 text-white" : "text-blue-500"
              } `}
            >
              Online
            </button>
            <button
              onClick={() => setOnline(false)}
              className={`text-base font-normal rounded-full px-4 py-2 w-1/2 ${
                !online ? "border border-blue-500 bg-blue-500 text-white" : "text-blue-500"
              } `}
            >
              Offline
            </button>
          </div>
        </div>

        {/* ITEM: Notifications */}
        <div className="border border-gray-300 rounded-xl px-4 py-8 text-left mb-4">
          <h1 className="text-xl font-normal pb-8">Notifications</h1>
          <p className="text-gray-500 pb-4">No New Notifications at this time</p>
        </div>

        {/* ITEM: Tips */}
        <div className="border border-gray-300 rounded-xl py-8 text-left">
          {/* ITEM: Tip 1 */}
          <div className="flex items-center justify-between px-4 mb-8 pb-8 border-b border-gray-300">
            <div className="flex items-center gap-2">
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
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Remote Dev Salary Explorer</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </div>

          {/* ITEM: Tip 2 */}
          <div className="flex items-center justify-between px-4 mb-8 pb-8 border-b border-gray-300">
            <div className="flex items-center gap-2">
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
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              <p>Resume Template and Tips</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </div>

          {/* ITEM: Tip 3 */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
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
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>

              <p>Interview Q&As</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default testFeed;
