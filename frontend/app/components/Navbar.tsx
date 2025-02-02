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
    <div className="flex items-center justify-between p-4 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
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
        <ul className="flex space-x-8">
          <li>
            <Link
              href="/"
              onClick={() => handleLinkClick("/")}
              className={`relative text-gray-300 hover:text-purple transition-colors duration-300 ${
                activeLink === "/"
                  ? "text-pink font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:rounded-full"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/converter"
              onClick={() => handleLinkClick("/converter")}
              className={`relative text-gray-300 hover:text-purple transition-colors duration-300 ${
                activeLink === "/converter"
                  ? "text-pink font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:rounded-full"
                  : ""
              }`}
            >
              Converter
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
