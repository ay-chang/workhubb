"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession(); // uses current session to check if user is logged in

  return (
    <div className="w-full flex">
      {/* ITEM: Sidebar */}
      <div className="w-1/4"></div>
      <div className="w-3/4">Main</div>
    </div>
  );
};

export default Profile;
