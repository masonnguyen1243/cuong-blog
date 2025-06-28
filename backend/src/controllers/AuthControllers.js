import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import SendEmail from "../utils/sendEmail.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/GenerateToken.js";
import ms from "ms";
import { CloudinaryProvider } from "../utils/Cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verifyToken: uuidv4(),
    });

    await newUser.save();

    //Send Email
    const verificationLink = `http://localhost:5173/account/verification?email=${newUser.email}&token=${newUser.verifyToken}`;
    const customSubject = "Please verify your email before using our service";
    const htmlContent = `
      <h3>Here is your verification link</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely, <br/> - Cuong's Blog - </h3>
    `;

    await SendEmail(newUser.email, customSubject, htmlContent);

    return res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(`Error in signup controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const accountVerification = async (req, res) => {
  try {
    const { email, token } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isActive) {
      return res.status(400).json({
        success: false,
        message: "Your account already active! Please login!",
      });
    }

    if (token !== user.verifyToken) {
      return res.status(400).json({ success: false, message: "Invalid Token" });
    }

    user.isActive = true;
    user.verifyToken = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Verification successfully! Please login!",
    });
  } catch (error) {
    console.error(`Error in accountVerification controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "Missing inputs" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }

    if (!user.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "Your account is not active" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("7 days"),
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    const { password: pass, ...rest } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: { rest, accessToken, refreshToken },
    });
  } catch (error) {
    console.error(`Error in login controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    console.error(`Error in logout controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, googlePhotoUrl } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id, user.role);

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("7 days"),
      };

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      const { password, ...rest } = user._doc;

      return res
        .status(200)
        .json({ success: true, data: { rest, accessToken, refreshToken } });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        avatar: googlePhotoUrl,
        isActive: true,
        verifyToken: null,
      });

      await newUser.save();

      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id, user.role);

      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: ms("7 days"),
      };

      res.cookie("accessToken", accessToken, cookieOptions);
      res.cookie("refreshToken", refreshToken, cookieOptions);

      const { password, ...rest } = newUser._doc;

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
          rest,
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (error) {
    console.error(`Error in googleLogin controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const changeAvatar = async (req, res) => {
  try {
    const image = req.file;
    const userId = req.user.userId;

    const user = await User.findOne({ _id: userId });

    const uploadResult = await CloudinaryProvider.streamUpload(
      image?.buffer,
      "avatar"
    );

    const updatedUser = await User.findOneAndUpdate(
      user._id,
      { avatar: uploadResult.secure_url },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    return res.status(200).json({
      success: true,
      message: "Change avatar successfully!",
      data: rest,
    });
  } catch (error) {
    console.error(`Error in changeAvatar controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const currentUser = await User.findOne({ _id: userId });

    const { password, ...rest } = currentUser._doc;

    return res.status(200).json({ success: true, data: rest });
  } catch (error) {
    console.error(`Error in getCurrentUser controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { password, username } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (!user.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "Your account is not active" });
    }
    if (id !== userId) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed to update this user",
      });
    }

    let hashedPassword = user.password;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    if (user) {
      user.username = username || user.username;
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error(`Error in updateUser controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      await user.deleteOne();
      return res
        .status(200)
        .json({ success: true, message: "Deleted successfully" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Deleted failed" });
    }
  } catch (error) {
    console.error(`Error in deleteUser controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const sortDirection = (req.query.sort = "asc" ? 1 : -1);

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassowrd = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      success: true,
      data: {
        users: usersWithoutPassowrd,
        totalUsers,
        lastMonthUsers,
      },
    });
  } catch (error) {
    console.error(`Error in getUsers controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
