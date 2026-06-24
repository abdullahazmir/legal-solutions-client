"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // ✅ Call the hook at the top of the component — gives you the current path string
  // e.g. if you're on /cases/abc123, pathname = "/cases/abc123"
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/70 backdrop-blur-lg">
      <header className="flex h-20 items-center justify-between px-6 lg:px-12">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/legal.png" alt="Legal Solutions Logo" width={102} height={32} className="rounded-lg" />
          <span className="text-white font-semibold text-xl">Legal<br />Solutions</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300">
          <li><Link href="/cases" className="text-white hover:text-white">Browse Cases</Link></li>
          <li><Link href="/dashboard/lawyer/lawfirm" className="hover:text-white">Law Firm</Link></li>
          <li><Link href="/plans" className="hover:text-white">Buy Plan</Link></li>

          <div className="h-6 w-px bg-gray-700" />

          {user ? (
            <>
              <span className="text-white text-sm">Hi, {user.name || user.email}</span>
              <Button variant="ghost" onClick={handleSignOut}>Sign out</Button>
            </>
          ) : (
            // ✅ pathname is the value returned by usePathname()
            // e.g. if you're on /cases, this becomes /auth/signin?redirect=/cases
            <li>
              <Link href={`/auth/signin?redirect=${pathname}`} className="text-blue-400 font-medium">
                Sign In
              </Link>
            </li>
          )}

          <Link href={`/auth/signup?redirect=${pathname}`}>
            <Button color="default" variant="flat" className="bg-white text-black font-bold">
              Get Started
            </Button>
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 p-6 flex flex-col gap-4">
          <Link href="/cases" className="text-white">Browse Cases</Link>
          <Link href="/dashboard/lawyer/lawfirm" className="text-white">Law Firm</Link>
          <Link href="/" className="text-white">To Know</Link>
          <hr className="border-gray-800" />
          {/* ✅ Same fix in mobile menu — use pathname not usePathname */}
          <Link href={`/auth/signin?redirect=${pathname}`} className="text-blue-400">Sign In</Link>
          <Link href={`/auth/signup?redirect=${pathname}`}>
            <Button color="default" variant="flat" className="bg-white text-black font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;