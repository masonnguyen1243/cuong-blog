import express from "express";
import { isAdmin, verifyToken } from "../middlewares/authMiddleware.js";
import {
  createComment,
  deleteComment,
  deleteCommentByAdmin,
  editComment,
  getComments,
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

router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

router.delete(
  "/deleteCommentByAdmin/:commentId",
  verifyToken,
  isAdmin,
  deleteCommentByAdmin
);

router.get("/getcomments", verifyToken, isAdmin, getComments);

export default router;
