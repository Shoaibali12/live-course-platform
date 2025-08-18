"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Topbar({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [instructorName, setInstructorName] = useState("Loading...");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setInstructorName(storedName);
    } else {
      setInstructorName("Guest");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    router.push("/login");
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex items-center gap-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-md"
        />
        <button className="p-2 rounded-full bg-gray-200">🔔</button>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-10 h-10 rounded-full bg-gray-400" />
          <span className="font-medium">{instructorName}</span>
        </div>

        {menuOpen && (
          <div className="absolute right-0 top-14 w-40 bg-white shadow-md rounded-md z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => router.push("/instructor/profile")}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
