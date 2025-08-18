// models/LiveSession.js
import mongoose from "mongoose";

const liveSessionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("LiveSession", liveSessionSchema);
