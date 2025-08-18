"use client";
export default function Topbar({ title }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded-md"
        />
        <button className="p-2 rounded-full bg-gray-200">🔔</button>
        <div className="w-10 h-10 rounded-full bg-gray-400" />
      </div>
    </header>
  );
}
