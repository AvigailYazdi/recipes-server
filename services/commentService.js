import { Comment } from "../models/Comment.js";

export const addCommentService = async (userId, recipeId, text) => {
    const newComment = new Comment({ userId, recipeId, text });
    const savedComment = await newComment.save();
    const populateComment = await savedComment.populate("userId","name");
    return populateComment;
}