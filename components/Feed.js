"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";

// This component is only being used within the Feed so we can create it
// within this file and not have to create a new file for it.
const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 post__layout">
      {data.map((post) => (
        <PostCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

// Feed Component
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchedResults, setSearchedResults] = useState([]); // array, state for the posts that will be filtered based on the search text
  const [searchText, setSearchText] = useState(""); // string state for the text within the search input,
  const [searchTimeout, setSearchTimeout] = useState(null); // timeout state for the debounce method

  // This effect will run once when the component is mounted and will fetch all the posts from the API
  // and add posts to the posts array state. This is simplyg retreiving all posts.
  const fetchPosts = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // DESCRIPTION: Search for posts based on the search text and return the results.
  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.post)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search__input peer"
        />
      </form>
      {searchText ? (
        <PostCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PostCardList data={allPosts} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
