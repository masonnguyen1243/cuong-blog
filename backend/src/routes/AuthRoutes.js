import express from "express";
import {
  accountVerification,
  signin,
  signup,
} from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/signup", signup);

router.put("/verify-account", accountVerification);

router.post("/sign-in", signin);

export default router;
