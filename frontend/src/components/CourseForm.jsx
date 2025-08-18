"use client";
import { useEffect, useState } from "react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/instructor/courses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setCourses(data);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="p-4 bg-white border rounded">
      <h2 className="text-lg font-bold mb-4">My Courses</h2>
      {courses.length === 0 ? (
        <p>No courses uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li
              key={course._id}
              className="border p-3 rounded flex gap-4 items-center"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm">{course.description}</p>
                <span className="text-green-600 font-bold">
                  ${course.price}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
