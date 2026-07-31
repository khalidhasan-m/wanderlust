"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current route path
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  // Helper function to determine if a link is active
  const isActive = (path) => pathname === path;

  return (
    <nav className="border-b border-gray-200 flex justify-between items-center font-medium bg-white p-5">
      {/* Left/Main Navigation Links */}
      <ul className="flex gap-4 items-center">
        <li>
          <Link
            href={"/"}
            className={`transition-colors hover:text-cyan-600 ${
              isActive("/")
                ? "text-cyan-600 font-bold border-b-2 border-cyan-500 pb-1"
                : "text-gray-600"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={"/destinations"}
            className={`transition-colors hover:text-cyan-600 ${
              isActive("/destinations")
                ? "text-cyan-600 font-bold border-b-2 border-cyan-500 pb-1"
                : "text-gray-600"
            }`}
          >
            Destinations
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link
                href={"/my-bookings"}
                className={`transition-colors hover:text-cyan-600 ${
                  isActive("/my-bookings")
                    ? "text-cyan-600 font-bold border-b-2 border-cyan-500 pb-1"
                    : "text-gray-600"
                }`}
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href={"/add-destination"}
                className={`transition-colors hover:text-cyan-600 ${
                  isActive("/add-destination")
                    ? "text-cyan-600 font-bold border-b-2 border-cyan-500 pb-1"
                    : "text-gray-600"
                }`}
              >
                Add Destination
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Logo */}
      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          alt="logo"
          height={150}
          width={150}
          loading="eager"
        />
      </div>

      {/* Right User Actions / Auth State */}
      <ul className="flex items-center gap-3">
        {user ? (
          <>
            <li>
              <Link
                href={"/profile"}
                className={`transition-colors hover:text-cyan-600 ${
                  isActive("/profile")
                    ? "text-cyan-600 font-bold"
                    : "text-gray-600"
                }`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Avatar>
                <Avatar.Image src={user?.image} />
                <Avatar.Fallback>
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </Avatar.Fallback>
              </Avatar>
            </li>
            <li>
              <Button
                onClick={handleSignOut}
                variant="danger"
                className="rounded-none cursor-pointer"
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href={"/login"}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive("/login")
                    ? "text-cyan-600 bg-cyan-50 border border-cyan-500"
                    : "text-gray-700 hover:text-cyan-600 hover:bg-gray-50"
                }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href={"/signup"}
                className={`px-4 py-2 text-sm font-medium rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 shadow-sm transition-all duration-200 ${
                  isActive("/signup")
                    ? "ring-2 ring-offset-2 ring-cyan-500"
                    : ""
                }`}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
