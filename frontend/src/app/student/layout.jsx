"use client";
import StudentNavbar from "../../components/StudentNavbar";
import Footer from "../../components/Footer";

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <StudentNavbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
