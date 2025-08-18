// routes/instructor.js
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Course from "../models/Course.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import PurchasedCourse from "../models/PurchasedCourse.js";
import dotenv from "dotenv";
import LiveSession from "../models/LiveSession.js";
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
    const course = await Course.findOne({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!course) return res.status(404).json({ error: "Course not found" });

    if (!req.file) {
      return res.status(400).json({ error: "Material file is required" });
    }

    course.materials.push({
      fileName: req.file.originalname, // ✅ original name
      fileUrl: req.file.path, // ✅ Cloudinary URL
    });

    await course.save();

    res.json({ message: "Material added successfully", course });
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
// ✅ Get all students who purchased instructor's courses
router.get(
  "/students",
  authMiddleware,
  roleMiddleware("instructor"),
  async (req, res) => {
    try {
      const instructorId = req.user.id;

      const purchases = await PurchasedCourse.find()
        .populate({
          path: "course",
          match: { instructor: instructorId }, // only this instructor’s courses
        })
        .populate("student", "name email"); // only select name + email

      // Filter out null courses (if not owned by this instructor)
      const students = purchases
        .filter((p) => p.course !== null)
        .map((p) => ({
          studentId: p.student._id,
          name: p.student.name,
          email: p.student.email,
          courseTitle: p.course.title,
          paymentStatus: p.paymentStatus,
          paymentId: p.paymentId,
        }));

      res.json({ success: true, students });
    } catch (err) {
      console.error("Error fetching students:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch students" });
    }
  }
);

// ✅ Create a live session
router.post(
  "/live/:courseId",
  authMiddleware,
  roleMiddleware("instructor"),
  async (req, res) => {
    try {
      const { courseId } = req.params;
      const instructorId = req.user.id;

      const roomUrl = `https://meet.jit.si/${courseId}-${Date.now()}`;

      const session = new LiveSession({
        course: courseId,
        instructor: instructorId,
        roomUrl,
      });

      await session.save();

      res.json({ success: true, session });
    } catch (err) {
      console.error("Error creating live session:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to create live session" });
    }
  }
);

// ✅ Get instructor’s live sessions
router.get(
  "/live",
  authMiddleware,
  roleMiddleware("instructor"),
  async (req, res) => {
    try {
      const sessions = await LiveSession.find({
        instructor: req.user.id,
      }).populate("course");
      res.json({ success: true, sessions });
    } catch (err) {
      console.error("Error fetching live sessions:", err);
      res
        .status(500)
        .json({ success: false, error: "Failed to fetch live sessions" });
    }
  }
);
export default router;
