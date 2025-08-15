import multer from "multer";

// Temporary storage before upload to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
