"use client";
import { useRouter } from "next/navigation";

export default function CourseCard({ course, showPurchase }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="rounded-md w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
      <p className="text-sm text-gray-500">
        By {course.instructor?.name || "Instructor"}
      </p>
      <p className="text-blue-600 font-bold mt-1">
        {course.price > 0 ? `$${course.price}` : "Free"}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => router.push(`/student/course/${course._id}`)}
          className="bg-gray-200 px-3 py-1 rounded-md text-sm"
        >
          View
        </button>
        {showPurchase && (
          <button
            onClick={() => router.push(`/student/checkout/${course._id}`)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Purchase
          </button>
        )}
      </div>
    </div>
  );
}
