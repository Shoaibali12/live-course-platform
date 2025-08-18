"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:5000/api/student/my-courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error("Error fetching purchased courses:", err);
      }
    };

    fetchMyCourses();
  }, []);

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      {courses.length === 0 ? (
        <p className="text-gray-500">
          You haven’t enrolled in any courses yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <img
                src={course.thumbnail || course.imageUrl || "/placeholder.png"}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.instructor?.name}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-3 rounded mt-2">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {course.progress || 0}% completed
              </p>

              {/* Quick Links */}
              <div className="mt-3 space-x-2">
                <Link
                  href={`/student/course/${course._id}/materials`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Materials
                </Link>
                <Link
                  href={`/student/course/${course._id}/live`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Live Session
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
