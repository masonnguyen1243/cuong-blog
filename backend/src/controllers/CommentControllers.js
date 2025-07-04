import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";

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

export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error(`Error in create getPostComments controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const userIndex = comment.likes.indexOf(userId);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(userId);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }

    await comment.save();
    return res.status(200).json({ success: true, data: comment });
  } catch (error) {
    console.error(`Error in create likeComment controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;
    const { content } = req.body;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed to edit this comment",
      });
    }

    const editedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content: content,
      },
      { new: true }
    );

    return res.status(200).json({
      succcess: true,
      message: "Edited successfully",
      data: editedComment,
    });
  } catch (error) {
    console.error(`Error in create editComment controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId).populate(
      "userId",
      "-password"
    );
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const user = await User.findById(comment.userId);
    if (!user || typeof user !== "object") {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...userData } = user._doc;
    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error(`Error in create editComment controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "You are not alowed to delete this comment",
      });
    }

    await comment.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    console.error(`Error in create deleteComment controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalComment = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      success: true,
      data: { comments, totalComment, lastMonthComments },
    });
  } catch (error) {
    console.error(`Error in create getComments controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCommentByAdmin = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;
    const comment = await Comment.findById(commentId);
    const user = await User.findById(userId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    await comment.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully!" });
  } catch (error) {
    console.error(`Error in create deleteComment controller`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
