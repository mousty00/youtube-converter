"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CgDarkMode } from "react-icons/cg";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const [loggedIn] = useState(true);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className="flex items-center justify-between py-4 px-8 bg-background fixed top-0 left-0 right-0 z-50">
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
                activeLink === "/" &&
                "bg-background2 text-foreground py-4 px-6 rounded-full  font-semibold text-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-1"
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
                activeLink === "/converter" &&
                "bg-background2  text-foreground py-4 px-6 rounded-full font-semibold text-lg after:absolute after:bottom-0 after:left-0 after:w-full after:h-1"
              }`}
            >
              Converter
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row gap-4 items-center h-full">
        <div className="bg-purpleCustom p-2 rounded-lg text-white h-full flex items-center">
          {loggedIn ? (
            <Link
              href={"/profile"}
              className="flex flex-row gap-2 items-center"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <Image
                  width={35}
                  height={35}
                  alt="profile picture"
                  src={"/user.jpeg"}
                  className="w-full h-full object-cover"
                />
              </div>
              <p>Username</p>
            </Link>
          ) : (
            <Link href={"/login"} className="py-4 px-6 uppercase rounded-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
