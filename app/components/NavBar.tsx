"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white shadow-md dark:bg-gray-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/globe.svg" alt="Logo" width={30} height={30} />
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            NextAuth
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 ${
              pathname === "/" ? "font-semibold text-indigo-600" : ""
            }`}
          >
            Home
          </Link>
          
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 ${
                  pathname === "/dashboard" ? "font-semibold text-indigo-600" : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
