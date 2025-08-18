"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function MaterialsPage() {
  const { id } = useParams(); // course id from URL
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/student/courses/${id}/materials`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Ensure data is always an array
        if (Array.isArray(data)) {
          setMaterials(data);
        } else if (data.materials && Array.isArray(data.materials)) {
          setMaterials(data.materials);
        } else {
          setMaterials([]); // fallback
        }
      } catch (err) {
        console.error("Error fetching materials:", err);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [id]);

  if (loading) return <p className="p-4">Loading materials...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Materials</h1>
      {materials.length === 0 ? (
        <p className="text-gray-500">
          No materials uploaded for this course yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {materials.map((m) => (
            <li key={m._id}>
              <a
                href={m.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {m.fileName || "View Material"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
