import express from "express";
import Course from "../models/Course.js";
import PurchasedCourse from "../models/PurchasedCourse.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// ✅ Purchase a course (Fake Payment)
router.post("/purchase/:courseId", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id; // from authMiddleware

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Check if already purchased
    const existingPurchase = await PurchasedCourse.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingPurchase) {
      return res.json({ success: false, message: "Course already purchased" });
    }

    // Create a new purchase
    const newPurchase = new PurchasedCourse({
      student: studentId,
      course: courseId,
      paymentStatus: "success", // fake success
      paymentId: uuidv4(), // fake transaction ID
    });

    await newPurchase.save();

    res.json({
      success: true,
      message: "Course purchased successfully",
      purchase: newPurchase,
    });
  } catch (err) {
    console.error("Purchase error:", err);
    res
      .status(500)
      .json({ success: false, error: "Failed to purchase course" });
  }
});

// ✅ Get student's purchased courses
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const studentId = req.user.id;

    const purchased = await PurchasedCourse.find({
      student: studentId,
    }).populate("course");

    res.json({
      success: true,
      courses: purchased.map((p) => ({
        _id: p.course._id,
        title: p.course.title,
        description: p.course.description,
        imageUrl: p.course.imageUrl, // 👈 Cloudinary URL
        instructor: p.course.instructor,
        paymentStatus: p.paymentStatus,
        paymentId: p.paymentId,
      })),
    });
  } catch (err) {
    console.error("Error fetching my courses:", err);
    res.status(500).json({ error: "Failed to fetch purchased courses" });
  }
});

// Get materials of a purchased course
router.get(
  "/courses/:id/materials",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      const studentId = req.user.id;
      const purchase = await PurchasedCourse.findOne({
        student: studentId,
        course: req.params.id,
      }).populate("course");

      if (!purchase)
        return res
          .status(403)
          .json({ error: "You have not purchased this course" });

      res.json(purchase.course.materials);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;
