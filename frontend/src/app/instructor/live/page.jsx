"use client";
import { useEffect, useState } from "react";

export default function InstructorLiveSessions() {
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/instructor/courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        // ✅ Handle both cases: array OR { courses: [...] }
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses(data.courses || []);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const startSession = async (courseId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/instructor/live/${courseId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setSessions((prev) => [...prev, data.session]);
        window.open(data.session.roomUrl, "_blank"); // open Jitsi room
      } else {
        alert(data.error || "Failed to start live session");
      }
    } catch (err) {
      console.error("Error starting session:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Live Sessions</h1>

      {/* ✅ List instructor courses with start button */}
      <h2 className="text-xl font-semibold mb-2">Your Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">You haven’t created any courses yet.</p>
      ) : (
        <ul className="mb-6">
          {courses.map((course) => (
            <li
              key={course._id}
              className="mb-2 flex justify-between items-center border p-3 rounded"
            >
              <span>{course.title}</span>
              <button
                onClick={() => startSession(course._id)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
                disabled={loading}
              >
                Start Live Session
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Show existing sessions */}
      <h2 className="text-xl font-semibold mb-2">Active Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No live sessions yet.</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Course</th>
              <th className="p-3">Room Link</th>
              <th className="p-3">Started At</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3">{s.course?.title}</td>
                <td className="p-3">
                  <a
                    href={s.roomUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Join Room
                  </a>
                </td>
                <td className="p-3">
                  {new Date(s.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
