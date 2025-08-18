"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function UploadsPage() {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const searchParams = useSearchParams();
  const courseIdFromUrl = searchParams.get("courseId"); // ✅ Get courseId from URL
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Fetch instructor courses
  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/instructor/courses",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Fetch uploads for selected course
  const fetchUploads = async (id) => {
    if (!id) return;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/instructor/courses/${id}/materials`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUploads(data);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (courseIdFromUrl) {
      setSelectedCourse(courseIdFromUrl);
      fetchUploads(courseIdFromUrl);
    }
  }, [courseIdFromUrl]);

  // Handle upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !selectedCourse) {
      alert("Please select a course and a file");
      return;
    }

    try {
      setLoading(true); // ✅ start loading
      const formData = new FormData();
      formData.append("material", file); // 👈 must match backend multer field

      await axios.post(
        `http://localhost:5000/api/instructor/courses/${courseId}/materials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("File uploaded successfully!");
      setFile(null);
      fetchUploads();
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed!");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-bold mb-4">Course Uploads</h2>

      {/* Select Course Dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            fetchUploads(e.target.value);
          }}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select Course --</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="mb-4 space-y-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload File
        </button>
      </form>

      {/* Uploaded Files */}
      {selectedCourse && (
        <>
          <h3 className="text-lg font-semibold mt-6 mb-2">Uploaded Files</h3>
          {uploads.length === 0 ? (
            <p className="text-gray-500">No uploads yet.</p>
          ) : (
            <ul className="border rounded divide-y">
              {uploads.map((u) => (
                <li
                  key={u._id}
                  className="p-2 flex justify-between items-center"
                >
                  <a
                    href={u.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {u.fileName || u.originalname || "View File"}
                  </a>
                  <span className="text-sm text-gray-500">
                    {new Date(u.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
