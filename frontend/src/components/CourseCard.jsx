"use client";

export default function CourseCard({
  course,
  showPurchase,
  onPurchase,
  disabled,
}) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-lg font-semibold">{course.title}</h2>
      <p className="text-sm text-gray-600">{course.instructor?.name}</p>
      <p className="text-md font-bold mt-2">
        {course.price > 0 ? `$${course.price}` : "Free"}
      </p>

      {showPurchase && (
        <button
          onClick={onPurchase}
          disabled={disabled}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {disabled ? "Processing..." : "Purchase"}
        </button>
      )}
    </div>
  );
}
