import express from "express";
import { accountVerification, signup } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/signup", signup);

router.put("/verify-account", accountVerification);

export default router;
