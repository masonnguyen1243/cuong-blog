import express from "express";
import {
  accountVerification,
  changeAvatar,
  deleteUser,
  getCurrentUser,
  googleLogin,
  logout,
  signin,
  signup,
  updateUser,
} from "../controllers/AuthControllers.js";
import { multerUploadMiddleware } from "../middlewares/multerUploadMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, getCurrentUser);

router.post("/signup", signup);

router.put("/verify-account", accountVerification);

router.post("/sign-in", signin);

router.delete("/logout", logout);

router.post("/google", googleLogin);

router.put("/update/:id", verifyToken, updateUser);

router.delete("/delete/:id", verifyToken, deleteUser);

router.post(
  "/change-avatar",
  verifyToken,
  multerUploadMiddleware.upload.single("avatar"),
  changeAvatar
);

export default router;
