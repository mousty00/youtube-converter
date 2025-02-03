"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="flex items-center justify-between py-4 px-8 backdrop-blur-lg shadow-sm fixed top-0 left-0 right-0 z-50">
      <Link href={"/"}>
        <Image
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="w-auto h-10"
        />
      </Link>

      <nav>
        <ul className="flex space-x-8 items-center p-4 rounded-full">
          <li>
            <Link
              href="/"
              onClick={() => handleLinkClick("/")}
              className={`relative hover:text-purpleCustom transition-colors duration-300 my-2 mx-0 ${
                activeLink === "/"
                  ? "text-white bg-neutral-950 py-4 px-6 rounded-full  font-semibold text-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-1"
                  : "text-gray-200"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/converter"
              onClick={() => handleLinkClick("/converter")}
              className={`relative hover:text-purpleCustom  transition-colors duration-300 ${
                activeLink === "/converter"
                  ? "text-white  bg-neutral-950 py-4 px-6 rounded-full font-semibold text-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-1"
                  : "text-gray-200"
              }`}
            >
              Converter
            </Link>
          </li>
        </ul>
      </nav>

      {/*
          this is the login section, i will implent it in the future
          <div>
            {loggedIn ? (
              <Link
                href={"/profile"}
                className="flex flex-row gap-2 items-center justify-center"
              >
                <Image
                  width={40}
                  height={40}
                  alt="profile picture"
                  src={"/logo.svg"}
                  className="rounded-full border aspect-square"
                />
                <p>Profile</p>
              </Link>
            ) : (
              <Link
                href={"/login"}
                className="py-2 px-6 bg-purpleCustom uppercase rounded-lg"
              >
                Login
              </Link>
            )}
          </div>
        */}
    </div>
  );
};

export default Navbar;
