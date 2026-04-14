import { Comment } from "../models/Comment.js";

export const addCommentService = async (userId, recipeId, text) => {
  const newComment = new Comment({ userId, recipeId, text });
  const savedComment = await newComment.save();
  const populateComment = await savedComment.populate("userId", "name");
  return populateComment;
};

export const getAllCommentsService = async () => {
  return await Comment.find({})
    .populate("userId", "name email")
    .populate("recipeId", "title")
    .sort({ createdAt: -1 });
};

export const addAdminReplyService = async (commentId, replyText) => {
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      adminReply: {
        text: replyText,
        createdAt: new Date(),
      },
    },
    { new: true, runValidators: true },
  );
  if (!comment) {
    throw new Error("Comment not found");
  }
  return comment;
};

export const deleteCommentService = async (commentId) => {
  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment) {
    throw new Error("Comment not found");
  }
  return deletedComment;
};
