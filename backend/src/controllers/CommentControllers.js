import Comment from "../models/CommentModel.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;
    const id = req.user.userId;

    if (userId !== id) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed to create this comment",
      });
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    return res.status(200).json({
      success: true,
      message: "Create comment successfully!",
      data: newComment,
    });
  } catch (error) {
    console.error(`Error in create createComment controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
