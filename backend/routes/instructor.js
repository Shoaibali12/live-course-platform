// routes/instructor.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Course from "../models/Course.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer-Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "courses",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "mp4"],
  },
});

const upload = multer({ storage });

// =====================
// 1. Create a course
// =====================
router.post(
  "/courses",
  authMiddleware,
  roleMiddleware("instructor"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, price } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Course image is required" });
      }

      console.log("Uploaded file:", req.file); // 🔍 Debug

      const course = await Course.create({
        title,
        description,
        price,
        instructor: req.user._id,
        imageUrl: req.file.path, // ✅ Cloudinary URL
      });

      res.status(201).json({ message: "Course created successfully", course });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// =====================
// 2. Get instructor's courses
// =====================
router.get(
  "/courses",
  authMiddleware,
  roleMiddleware("instructor"),
  async (req, res) => {
    try {
      const courses = await Course.find({ instructor: req.user._id });
      res.json(courses);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// =====================
// 3. Add course material (upload to Cloudinary)
// =====================
router.post(
  "/courses/:id/materials",
  authMiddleware,
  roleMiddleware("instructor"),
  upload.single("material"),
  async (req, res) => {
    try {
      const course = await Course.findOne({
        _id: req.params.id,
        instructor: req.user._id,
      });

      if (!course) return res.status(404).json({ error: "Course not found" });

      if (!req.file) {
        return res.status(400).json({ error: "Material file is required" });
      }

      course.materials.push({
        fileName: req.file.originalname,
        fileUrl: req.file.path, // ✅ already Cloudinary URL
      });

      await course.save();

      res.json({ message: "Material added successfully", course });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// =====================
// 4. Get course materials
// =====================
router.get(
  "/courses/:id/materials",
  authMiddleware,
  roleMiddleware("instructor"),
  async (req, res) => {
    try {
      const course = await Course.findOne({
        _id: req.params.id,
        instructor: req.user._id,
      });

      if (!course) return res.status(404).json({ error: "Course not found" });

      res.json(course.materials);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
