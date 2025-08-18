// routes/course.js
import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// =====================
// 1. Get all courses (public - no auth required)
// =====================
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// 2. Get single course by ID
// =====================
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) return res.status(404).json({ error: "Course not found" });

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
