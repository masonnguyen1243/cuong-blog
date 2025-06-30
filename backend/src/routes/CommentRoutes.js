import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  createComment,
  editComment,
  getPostComments,
  getUserComment,
  likeComment,
} from "../controllers/CommentControllers.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.get("/getPostComments/:postId", getPostComments);

router.put("/likeComment/:commentId", verifyToken, likeComment);

router.put("/editComment/:commentId", verifyToken, editComment);

router.get("/getUserComment/:commentId", getUserComment);

export default router;
