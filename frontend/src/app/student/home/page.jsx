"use client";
import { useEffect, useState } from "react";
import CourseCard from "../../../components/CourseCard";
import MyCourses from "../courses/page";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all courses
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

  // Handle purchase
  const handlePurchase = async (courseId, courseTitle) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/student/purchase/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert(`✅ Payment Success! You are enrolled in ${courseTitle}`);
      } else {
        alert(`❌ Payment Failed: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error("Purchase error:", err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            showPurchase
            onPurchase={() => handlePurchase(course._id, course.title)}
            disabled={loading}
          />
        ))}
      </div>

      {/* ✅ Render MyCourses section */}
      <MyCourses />
    </div>
  );
}
