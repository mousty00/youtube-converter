import Link from "next/link";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-neutral-950 text-white py-8 px-4 flex flex-col items-center">
      <p className="text-center text-lg font-semibold mb-4">Website developed by Mousty</p>
      <ul className="flex space-x-6 mb-6">
        <li>
          <FaGithub size={30} className="hover:text-gray-400 transition duration-200" />
        </li>
        <li>
          <FaInstagram size={30} className="hover:text-gray-400 transition duration-200" />
        </li>
        <li>
          <FaTwitter size={30} className="hover:text-gray-400 transition duration-200" />
        </li>
      </ul>
      <div className="mt-4">
        <Link
          href="/privacy-policy"
          className="text-blue-400 hover:text-blue-500 font-semibold transition duration-200"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
