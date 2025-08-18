"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InstructorCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 Auth token

        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/instructor/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
      <button
        onClick={() => router.push("/instructor/courses/new")}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-6"
      >
        + Create New Course
      </button>

      {courses.length === 0 ? (
        <p>No courses found. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg shadow p-4 flex flex-col"
            >
              {/* ✅ Show Cloudinary image */}
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>
              <p className="mt-2 font-bold text-blue-600">${course.price}</p>
              <button
                onClick={() => router.push(`/instructor/courses/${course._id}`)}
                className="mt-4 px-3 py-2 bg-green-600 text-white rounded"
              >
                View Materials
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
