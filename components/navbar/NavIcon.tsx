"use client";

import Link from "next/link";
import React from "react";

const NavIcon = ({
  icon,
  text,
  path,
  activePath,
}: {
  icon: any;
  text: string;
  path: string;
  activePath: boolean;
}) => {
  return (
    <Link
      href={path}
      rel="noreferrer"
      className={
        activePath
          ? `flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-neutral-300 bg-opacity-60 text-primary-900 gap-0.5`
          : "flex h-16 w-16 flex-col items-center justify-center rounded-xl text-neutral-500 hover:text-neutral-600 hover:bg-neutral-300 hover:bg-opacity-20 gap-1.5"
      }
    >
      {icon}
      <p className="t-label">{text}</p>
    </Link>
  );
};

export default NavIcon;
