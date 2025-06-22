import Post from "../models/PostModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(404).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.userId,
    });

    const savedPost = await newPost.save();

    return res.status(200).json({ success: false, data: savedPost });
  } catch (error) {
    console.error(`Error in create createPost controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
