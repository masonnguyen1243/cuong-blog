import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createComment,
  getPostComments,
  likeComment,
} from "../controllers/CommentControllers.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.get("/getPostComments/:postId", getPostComments);

router.put("/likeComment/:commentId", verifyToken, likeComment);

export default router;
