import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createPost } from "../controllers/PostControllers.js";
import { multerUploadMiddleware } from "../middlewares/multerUploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  multerUploadMiddleware.upload.single("image"),
  createPost
);

export default router;
