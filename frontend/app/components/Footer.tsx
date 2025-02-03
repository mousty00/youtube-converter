import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-neutral-950 text-white py-8 px-4 flex flex-col items-center rounded-t-[20%]">
      <div className="flex justify-center gap-4 items-center">
        <p className="text-right text-lg font-semibold m-4">
          Website developed <br />{" "}
          <span className="text-purpleCustom text-xl">by Mousty</span>
        </p>
        <Link href={"/about"}>
        <Image
          src={"/picture-dev.jpg"}
          width={60}
          height={60}
          alt="developer picture"
          className="rounded-full cursor-pointer border-4 border-purpleCustom hover:border-8 transition duration-200"
        />
        </Link>
      </div>
      <ul className="flex space-x-6 m-4">
        <li>
          <a href="https://github.com/mousty00" target="_blank">
            <FaGithub
              size={35}
              className="text-purpleCustom hover:text-purpleCustom transition duration-200"
            />
          </a>
        </li>
        <li>
          <a href="https://instagram.com/mousty00" target="_blank">
            <FaInstagram
              size={35}
              className="text-purpleCustom hover:text-purpleCustom transition duration-200"
            />
          </a>
        </li>
        <li>
          <a href="" target="_blank">
            <FaTwitter
              size={35}
              className="text-purpleCustom hover:text-purpleCustom transition duration-200"
            />
          </a>
        </li>
      </ul>
      <div className="mt-4">
        <Link
          href="/privacy-policy"
          className="underline text-hover font-semibold transition duration-200"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
