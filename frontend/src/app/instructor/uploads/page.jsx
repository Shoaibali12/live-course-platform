"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UploadsPage() {
  const [file, setFile] = useState(null);
  const [uploads, setUploads] = useState([]);

  // Fetch all uploaded files
  const fetchUploads = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/uploads");
      setUploads(data);
    } catch (error) {
      console.error("Error fetching uploads:", error);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before uploading");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        `http://localhost:5000/api/instructor/courses/${courseId}/materials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ auth required
          },
        }
      );

      alert("File uploaded successfully!");
      setFile(null);
      fetchUploads(); // refresh uploaded files
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-6 flex-1">
      <h2 className="text-2xl font-bold mb-4">Uploads</h2>

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
      <h3 className="text-lg font-semibold mt-6 mb-2">Uploaded Files</h3>
      {uploads.length === 0 ? (
        <p className="text-gray-500">No uploads yet.</p>
      ) : (
        <ul className="border rounded divide-y">
          {uploads.map((u) => (
            <li key={u._id} className="p-2 flex justify-between items-center">
              {/* File name clickable */}
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
    </div>
  );
}
