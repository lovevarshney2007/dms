const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const adminAuth = require("../middleware/adminAuth");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const router = express.Router();

let storage;

if (process.env.CLOUDINARY_URL) {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "dms_aarohi_uploads",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    },
  });
} else {
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });
}

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"));
    }
    cb(null, true);
  },
});

router.post("/upload", adminAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  
  let url;
  if (process.env.CLOUDINARY_URL) {
    url = req.file.path; // Cloudinary returns the URL in req.file.path
  } else {
    const baseUrl = process.env.API_BASE_URL || `${req.protocol}://${req.get("host")}`;
    url = `${baseUrl}/uploads/${req.file.filename}`;
  }
  
  res.status(201).json({ url });
});

module.exports = router;
