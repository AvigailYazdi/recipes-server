import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    images: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "Recipe must have at least one image"
        }
    },
    categories: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "Recipe must have at least one category"
        }
    },
    prepTimeMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    servings: Number,
    ingredients: {
        type: [{
            name: { type: String, required: true },
            amount: Number,
            unit: String
        }],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "Recipe must have at least one ingredient"
        }
    },
    steps: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "Recipe must have at least one step"
        }
    },
    tags: [String],
    status: { type: String, enum: ["published", "draft"], default: "draft" }
}, { timestamps: true });

export const Recipe = mongoose.model("Recipe", recipeSchema);