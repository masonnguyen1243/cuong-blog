import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

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

    return res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log(`Error in signup controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
