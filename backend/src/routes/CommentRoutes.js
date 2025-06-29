import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createComment,
  getPostComments,
} from "../controllers/CommentControllers.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.get("/getPostComments/:postId", getPostComments);

export default router;
