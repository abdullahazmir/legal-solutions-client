"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/70 backdrop-blur-lg">
      <header className="flex h-20 items-center justify-between px-6 lg:px-12">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/legal.png" alt="Legal Solutions Logo" width={102} height={32} className="rounded-lg" />

         
          <span className="text-white font-semibold text-xl">Legal<br />Solutions</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li><Link href="#" className="text-white hover:text-white">Browse Jobs</Link></li>
          <li><Link href="#" className="hover:text-white">Company</Link></li>
          <li><Link href="#" className="hover:text-white">Pricing</Link></li>
          <div className="h-6 w-px bg-gray-700" /> {/* Divider */}
          <li><Link href="#" className="text-blue-400 font-medium">Sign In</Link></li>
          <li>
            <Button color="default" variant="flat" className="bg-white text-black font-bold">
              Get Started
            </Button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 p-6 flex flex-col gap-4">
          <Link href="#" className="text-white">Browse Jobs</Link>
          <Link href="#" className="text-white">Company</Link>
          <Link href="#" className="text-white">Pricing</Link>
          <hr className="border-gray-800" />
          <Link href="#" className="text-blue-400">Sign In</Link>
          <Button className="bg-white text-black w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;