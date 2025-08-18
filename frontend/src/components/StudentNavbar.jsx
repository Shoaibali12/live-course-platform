"use client";
import { Bell, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        EduHub
      </Link>

      {/* Search */}
      <input
        type="text"
        placeholder="Search courses..."
        className="border rounded px-3 py-1 w-1/3"
      />

      {/* Right icons */}
      <div className="flex gap-4 items-center">
        <Bell className="w-6 h-6 cursor-pointer text-gray-600" />
        <div className="relative">
          <User className="w-8 h-8 cursor-pointer text-gray-600" />
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 bg-white shadow rounded hidden group-hover:block">
            <Link
              href="/student/dashboard"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              My Courses
            </Link>
            <Link
              href="/student/profile"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Account
            </Link>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
