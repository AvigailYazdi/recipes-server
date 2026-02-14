import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
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
    value: { type: Number, min: 1, max: 5, required: true },


}, { timestamps: true });

ratingSchema.index(
    { userId: 1, recipeId: 1 },
    { unique: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);