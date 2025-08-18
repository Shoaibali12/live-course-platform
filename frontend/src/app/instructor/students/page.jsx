"use client";
import { useEffect, useState } from "react";

export default function InstructorStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:5000/api/instructor/students",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Students</h1>

      {students.length === 0 ? (
        <p className="text-gray-500">
          No students have purchased your courses yet.
        </p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Course</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.paymentId} className="border-t">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.courseTitle}</td>
                <td className="p-3">{s.paymentStatus}</td>
                <td className="p-3">{s.paymentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
