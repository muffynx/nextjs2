"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-base-300">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 bg-gray-100 rounded-lg ">
        {/* Logo or Brand Name */}
        <Link href="/" className="text-xl font-bold text-black rounded-lg">
          Pound.
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-xl focus:outline-none"
          >
            &#9776;
          </button>
        </div>

        {/* Horizontal Menu for Large Screens */}
        <div className="hidden lg:flex space-x-6 ">
          <Link className="font-semibold text-black" href="/">
            Home
          </Link>
          <Link className="font-semibold  text-black" href="/about">
            About Me
          </Link>
          <Link className="font-semibold text-black" href="/pokemon">
            Pokemon
          </Link>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-base-300">
          <ul className="space-y-4 p-4">
            <li>
              <Link className="font-semibold " href="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link className="font-semibold" href="/about-me" onClick={toggleMenu}>
                About Me
              </Link>
            </li>
            <li>
              <Link className="font-semibold" href="/pokemon" onClick={toggleMenu}>
                Pokemon
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
