"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Info from "@components/profile/Info";
import Billing from "@components/profile/Billing";
import Password from "@components/profile/Password";
import Membership from "@components/profile/Membership";
import Teams from "@components/profile/Teams";
import Notifications from "@components/profile/Notifications";
import Settings from "@components/profile/Settings";

const Profile = () => {
  const [currentItem, setItem] = useState("Info");

  const profileItems = [
    "Info",
    "Billing",
    "Password",
    "Membership",
    "Teams",
    "Notification",
    "Settings",
  ];

  const { data: session } = useSession(); // uses current session to check if user is logged in

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div className="w-1/4 mr-8 px-4 py-4 rounded-lg flex flex-col gap-4">
        <button
          onClick={() => setItem("Info")}
          className={`text-left ${
            currentItem === "Info" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          My Info
        </button>
        <button
          onClick={() => setItem("Billing")}
          className={`text-left ${
            currentItem === "Billing" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          Billing & Payment
        </button>
        <button
          onClick={() => setItem("Password")}
          className={`text-left ${
            currentItem === "Password" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          Password & Security
        </button>
        <button
          onClick={() => setItem("Membership")}
          className={`text-left ${
            currentItem === "Membership" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          Membership Benefits
        </button>
        <button
          onClick={() => setItem("Teams")}
          className={`text-left ${
            currentItem === "Teams" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          Teams
        </button>
        <button
          onClick={() => setItem("Notification")}
          className={`text-left ${
            currentItem === "Notification" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          Notification Settings
        </button>
        <button
          onClick={() => setItem("Settings")}
          className={`text-left ${
            currentItem === "Settings" ? "border-l-4 border-blue-400 w-fit pl-1" : ""
          }`}
        >
          Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4">
        {currentItem === "Info" && <Info session={session} />}
        {currentItem === "Billing" && <Billing />}
        {currentItem === "Password" && <Password />}
        {currentItem === "Membership" && <Membership />}
        {currentItem === "Teams" && <Teams />}
        {currentItem === "Notifications" && <Notifications />}
        {currentItem === "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default Profile;
