"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-3">EduHub</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your gateway to knowledge. Learn from top instructors and gain the
          skills you need to excel in your career. Whether you’re starting your
          journey or upgrading your expertise — EduHub is here for you.
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/register")}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
        >
          Get Started — Register
        </button>
        <button
          onClick={() => router.push("/login")}
          className="px-8 py-3 bg-gray-100 text-gray-800 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
        >
          Already have an account? Login
        </button>
      </div>

      {/* Features Section */}
      <section className="mt-16 grid sm:grid-cols-3 gap-8 text-center max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Expert Instructors
          </h3>
          <p className="text-gray-600">
            Learn from industry professionals with years of experience.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Flexible Learning
          </h3>
          <p className="text-gray-600">
            Access courses anytime, anywhere, at your own pace.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Career Growth
          </h3>
          <p className="text-gray-600">
            Gain the skills that employers are looking for today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} EduHub. All rights reserved.
      </footer>
    </div>
  );
}
