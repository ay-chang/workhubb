"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession(); // uses current session to check if user is logged in

  return (
    <div className="w-full flex">
      {/* ITEM: Sidebar */}
      <div className="w-1/4 mr-8 px-4 py-4 rounded-lg flex flex-col gap-4">
        <p>My Info</p>
        <p>Billing & Payment</p>
        <p>Password & Security</p>
        <p>Membership Benefits</p>
        <p>Teams</p>
        <p>Notification Settings</p>
        <p>Settings</p>
      </div>
      {/* ITEM: Main */}
      <div className="w-3/4">
        {/* ITEM: Top Part */}
        <div className="border-b border-gray-200">
          <p className="text-3xl">{session.user.name}</p>
          <p className="text-blue-500 text-base pb-8">Web Developer</p>
          {/* ITEM: Rating */}
          <div className="">
            <p className="text-xs text-gray-500">Freelancer Rating</p>
            <div className="flex text-gray-200 items-center">
              <p className="pr-2 text-lg text-black">0.0</p>
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
            <div className="flex gap-8 pt-8 pb-8">
              <button className="flex gap-2 text-base items-center">
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                Saved Posts
              </button>
              <button className="blue__btn">Create Post</button>
            </div>
          </div>
        </div>
        {/* ITEM: Contact Info */}
        <div className="text-base pb-4">
          <p className="pt-8 pb-4 text-xs text-gray-500">Contact Information</p>
          <div className="flex flex-col gap-4">
            <p className="items-end">
              Phone: <span className="text-blue-500 text-sm">571 218 6868</span>
            </p>
            <p className="items-end">
              Address: <span className="text-blue-500 text-sm">1684 North Quinn st</span>
            </p>
            <p className="items-end">
              Email: <span className="text-blue-500 text-sm">{session.user.email}</span>
            </p>
          </div>
        </div>
        {/* ITEM: Basic Info */}
        <div>
          <p className="pt-8 pb-4 text-xs text-gray-500">Basic Information</p>
          <div className="flex flex-col gap-4">
            <p className="items-end">
              Birthday: <span className="text-sm">April 30, 2003</span>
            </p>
            <p className="items-end">
              Gender: <span className="text-sm">Male</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
