import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import instructorRoutes from "./routes/instructor.js";

import courseRoutes from "./routes/course.js";
import studentRoutes from "./routes/student.js";
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "*" })); // Adjust origin if needed
app.use(express.json()); // JSON parser

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

// API Routes
app.use("/api/auth", authRoutes); // login/register
app.use("/api/instructor", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/student", studentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
