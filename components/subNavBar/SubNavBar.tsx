"use client";

import React from "react";
import Gallery from "@/components/subNavBar/gallery/Gallery";
import { usePathname } from "next/navigation";
import UserDetails from "./userDetails/UserDetails";

const SubNavBar = () => {
  const pathname = usePathname();
  return (
    <div className="rounded-md lg:rounded-none w-full mt-2 lg:mt-0 lg:w-[374px] bg-[#F4EDE2] border-r border-[#EBE1D3]">
      {pathname === "/chat" ? <Gallery /> : <UserDetails />}
    </div>
  );
};

export default SubNavBar;
