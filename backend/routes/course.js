import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Get all courses (public for students & instructors)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
