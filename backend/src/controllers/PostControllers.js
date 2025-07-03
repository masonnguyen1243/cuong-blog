import Post from "../models/PostModel.js";
import { CloudinaryProvider } from "../utils/Cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file;

    if (!title || !content) {
      return res.status(404).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const uploadResult = await CloudinaryProvider.streamUpload(
      image?.buffer,
      "image"
    );

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.userId,
      image: uploadResult.secure_url,
    });

    const savedPost = await newPost.save();

    return res.status(200).json({ success: true, data: savedPost });
  } catch (error) {
    console.error(`Error in create createPost controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          {
            title: { $regex: req.query.searchTerm, $options: "i" },
            content: { $regex: req.query.searchTerm, $options: "i" },
          },
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res
      .status(200)
      .json({ success: true, data: { posts, totalPosts, lastMonthPosts } });
  } catch (error) {
    console.error(`Error in create getPosts controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post) {
      await post.deleteOne();
      return res
        .status(200)
        .json({ success: true, message: "Deleted successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Delete failed" });
    }
  } catch (error) {
    console.error(`Error in create deletePost controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const image = req.file;

    const uploadResult = await CloudinaryProvider.streamUpload(
      image?.buffer,
      "image"
    );

    const post = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title || post.title,
          content: content || post.content,
          category: category || post.category,
          image: uploadResult.secure_url || post.image,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.error(`Error in create updatePost controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurrentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error(`Error in create getCurrentPost controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
