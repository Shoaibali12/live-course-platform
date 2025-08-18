"use client";
import { useEffect, useState } from "react";

import CourseCard from "../../../components/CourseCard";
export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-4">All Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} showPurchase />
          ))}
        </div>
      </div>
    </div>
  );
}
