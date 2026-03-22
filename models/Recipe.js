import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Recipe must have at least one image",
      },
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Recipe must have at least one category",
      },
    },
    prepTimeMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ["קל", "בינוני", "קשה"] },
    servings: {type: Number, required: true},
    ingredients: {
      type: [
        {
          title: String,
          items: [
            {
              name: { type: String, required: true },
              amount: String,
              unit: String,
            },
          ],
        },
      ],
      required: true,
      validate: {
        validator: (arr) =>
          arr.length > 0 &&
          arr.every(
            (section) =>
              Array.isArray(section.items) && section.items.length > 0,
          ),
        message:
          "Recipe must have at least one ingredient section with at least one item",
      },
    },
    steps: {
      type: [
        {
          title: String,
          items: [{ type: String, required: true }],
        },
      ],
      required: true,
      validate: {
        validator: (arr) =>
          arr.length > 0 &&
          arr.every(
            (section) =>
              Array.isArray(section.items) && section.items.length > 0,
          ),
        message:
          "Recipe must have at least one step section with at least one step",
      },
    },
    tags: [String],
    status: { type: String, enum: ["פורסם", "טיוטה"], default: "טיוטה" },
  },
  { timestamps: true },
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
