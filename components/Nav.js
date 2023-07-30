"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

/**
 * Things to implement in this file
 *
 * TODO:
 * - Add a logo in the first Link tag, replace the word logo with an actual logo
 * - Add logo to the public/assets/imgages folder
 * - Connect profile image for button == "/profile", w & h = 37px, className = "rounded-full" ✅
 * - fix mobile nav ✅
 */

const nav = () => {
  const { data: session } = useSession(); // uses current session to check if user is logged in
  const [providers, setProviders] = useState(null); // state for storing providers
  const [toggleDropdown, setToggleDropdown] = useState(false); // state for toggling dropdown menu

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 pb-4 border-b border-gray-100 z-50">
      <Link href="/" className="flex gap-2 flex-center">
        <p className="text-lg">
          <b className="blue__gradient text-xl">{"</>"}</b> workhubb
        </p>
      </Link>

      {/* Desktop Nav */}
      <div className="sm:flex hidden relative">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="outline__btn">
              Create Post
            </Link>
            <div onClick={() => setToggleDropdown((prev) => !prev)}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
              />
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                {/* FIXME: change test-profile back to just profile **/}
                <Link
                  href="/test-profile"
                  className="dropdown__link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/saved-posts"
                  className="dropdown__link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Saved Posts
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black__btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="outline__btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <div onClick={() => setToggleDropdown((prev) => !prev)}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
              />
            </div>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown__link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown__link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black__btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black__btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default nav;
