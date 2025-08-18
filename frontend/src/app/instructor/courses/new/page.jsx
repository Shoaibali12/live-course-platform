"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCoursePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/instructor/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create course");

      const data = await res.json();
      console.log("✅ Course created:", data);

      router.push("/instructor/courses");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
