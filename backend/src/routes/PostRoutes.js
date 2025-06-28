import express from "express";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/PostControllers.js";
import { multerUploadMiddleware } from "../middlewares/multerUploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  verifyToken,
  multerUploadMiddleware.upload.single("image"),
  createPost
);

router.get("/getposts", getPosts);

router.delete("/deletepost/:id", verifyToken, isAdmin, deletePost);

router.put(
  "/updatepost/:id",
  verifyToken,
  isAdmin,
  multerUploadMiddleware.upload.single("image"),
  updatePost
);

export default router;
