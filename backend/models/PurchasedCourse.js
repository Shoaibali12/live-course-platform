import mongoose from "mongoose";

const purchasedCourseSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentId: { type: String }, // Fake transaction ID
  },
  { timestamps: true }
);

export default mongoose.model("PurchasedCourse", purchasedCourseSchema);
