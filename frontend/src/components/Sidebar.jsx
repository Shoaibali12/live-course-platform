"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/instructor/dashboard" },
  { name: "Courses", href: "/instructor/courses" },
  { name: "Uploads", href: "/instructor/uploads" },
  { name: "Live Stream", href: "/instructor/live" },
  { name: "Students", href: "/instructor/students" },
  { name: "Payments", href: "/instructor/payments" },
  { name: "Settings", href: "/instructor/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-72 bg-white shadow-md flex flex-col">
      <h1 className="p-6 font-bold text-xl">Instructor</h1>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-6 py-3 hover:bg-gray-100 ${
              pathname === item.href ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
