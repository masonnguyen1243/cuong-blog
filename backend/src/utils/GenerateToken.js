import jwt from "jsonwebtoken";
import { ENV } from "../config/environment.js";

export const generateAccessToken = (userId, userRole) => {
  try {
    const accessToken = jwt.sign(
      { userId, userRole },
      ENV.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: ENV.JWT_ACCESS_TOKEN_EXPIRED }
    );

    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

export const generateRefreshToken = (userId, userRole) => {
  try {
    const refreshToken = jwt.sign(
      { userId, userRole },
      ENV.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: ENV.JWT_REFRESH_TOKEN_EXPIRED }
    );

    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};
