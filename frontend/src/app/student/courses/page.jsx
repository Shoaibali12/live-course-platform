"use client";
import CourseCard from "@/components/CourseCard";

export default function MyCourses() {
  // Later fetch purchased courses from API
  const purchasedCourses = [
    {
      _id: "1",
      title: "C++ Fundamentals",
      description: "This covers all fundamentals.",
      price: 122,
      imageUrl: "https://placehold.co/600x400",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>
      {purchasedCourses.length === 0 ? (
        <p>You haven’t purchased any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {purchasedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
