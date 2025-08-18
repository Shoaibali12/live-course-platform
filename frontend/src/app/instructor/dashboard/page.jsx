"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, enrollments: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch instructor courses
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/instructor/courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        // Handle both cases: array OR { courses: [...] }
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses(data.courses || []);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    // Fetch stats
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/instructor/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    // Fetch recent activity
    const fetchActivity = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/instructor/activity",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setRecentActivity(data.activities || []);
      } catch (err) {
        console.error("Error fetching activity:", err);
      }
    };

    fetchCourses();
    fetchStats();
    fetchActivity();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h4 className="text-sm text-gray-500">Revenue</h4>
          <p className="text-xl font-bold">${stats.revenue}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h4 className="text-sm text-gray-500">Enrollments</h4>
          <p className="text-xl font-bold">{stats.enrollments}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">Live Now</div>
        <div className="p-4 bg-white shadow rounded-lg">Storage</div>
      </div>

      {/* Courses Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">My Courses</h3>
        <div className="grid grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-4 bg-white shadow rounded-lg hover:shadow-md"
            >
              <img
                src={course.imageUrl || "/placeholder.png"}
                alt={course.title}
                className="w-full h-40 object-cover rounded"
              />

              <h4 className="mt-2 font-semibold">{course.title}</h4>
              <p className="text-sm text-gray-500">{course.description}</p>
              <p className="mt-1 text-green-600 font-bold">${course.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Event</th>
              <th className="text-left">Course</th>
              <th className="text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <tr key={index} className="border-b">
                  <td>{activity.event}</td>
                  <td>{activity.courseTitle}</td>
                  <td>{activity.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No recent activity found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
