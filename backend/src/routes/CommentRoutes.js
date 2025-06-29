import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createComment } from "../controllers/CommentControllers.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

export default router;
