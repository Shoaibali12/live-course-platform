"use client";
import { useState } from "react";

export default function CourseTabs({ overview, instructor, reviews }) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="mt-6">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        <button
          onClick={() => setTab("overview")}
          className={tab === "overview" ? "text-blue-600 font-bold" : ""}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("instructor")}
          className={tab === "instructor" ? "text-blue-600 font-bold" : ""}
        >
          Instructor
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={tab === "reviews" ? "text-blue-600 font-bold" : ""}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div className="mt-4">
        {tab === "overview" && <p>{overview}</p>}
        {tab === "instructor" && <p>{instructor}</p>}
        {tab === "reviews" && <p>{reviews}</p>}
      </div>
    </div>
  );
}
