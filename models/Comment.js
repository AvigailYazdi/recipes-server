import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    text: { type: String, required: true, minlength: 1, maxlength: 800 },
    adminReply: {
      text: {
        type: String,
        maxlength: 800,
      },
      createdAt: {
        type: Date,
      },
      default: null
    },
}, { timestamps: true });

commentSchema.index({ recipeId: 1, createdAt: -1 });// Grouped by recipeId and sorted in descending order by createdAt

export const Comment = mongoose.model("Comment", commentSchema);