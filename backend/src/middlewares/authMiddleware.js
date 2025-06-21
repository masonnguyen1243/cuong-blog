import jwt from "jsonwebtoken";
import { ENV } from "../config/environment.js";

export const verifyToken = async (req, res, next) => {
  const clientAccessToken = req.cookies?.accessToken;

  if (!clientAccessToken) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }

  try {
    if (!ENV.JWT_ACCESS_TOKEN_SECRET) {
      console.error("JWT Secret Key is not defined.");
      return res.status(400).json({
        success: false,
        message: "Server configuration error: JWT secret key missing.",
      });
    }

    const decoded = jwt.verify(clientAccessToken, ENV.JWT_ACCESS_TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return res.status(400).json({ message: "Token expired" });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user && req.user.userRole === "admin") {
    next();
  } else {
    return res
      .status(500)
      .json({ succcess: false, message: "REQUIRE ADMIN ROLE!" });
  }
};
