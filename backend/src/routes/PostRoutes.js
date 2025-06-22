import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createPost } from "../controllers/PostControllers.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);

export default router;
