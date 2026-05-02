import { Comment } from "../models/Comment.js";
import { Rating } from "../models/Rating.js";
import { Recipe } from "../models/Recipe.js";
import { User } from "../models/User.js";

export const addRecipeService = async (recipeData) => {
  const recipe = new Recipe(recipeData);
  return await recipe.save();
};

export const getAllRecipesService = async (filter, sortOption) => {
  const sortMap = {
    "החדשים ביותר": { updatedAt: -1 },
    "הישנים ביותר": { updatedAt: 1 },
    "זמן הכנה קצר": { prepTimeMinutes: 1 },
    "זמן הכנה ארוך": { prepTimeMinutes: -1 },
  };
  const sortObj = sortMap[sortOption] || { updatedAt: -1 };
  return await Recipe.find(filter).sort(sortObj);
};

export const getRecipeByIdService = async (id, isAdmin) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  if (recipe.status === "טיוטה" && !isAdmin) {
    throw new Error("Administrator permission required");
  }
  return recipe;
};

export const addToFavoriteService = async (userId, recipeId) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { favorites: recipeId } },
    { new: true },
  );
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser.favorites;
};

export const removeFromFavoriteService = async (userId, recipeId) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favorites: recipeId } },
    { new: true },
  );
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser.favorites;
};

export const deleteRecipeService = async (recipeId) => {
  const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
  if (!deletedRecipe) {
    throw new Error("Recipe not found");
  }
  return deletedRecipe;
};

export const updateRecipeService = async (recipeId, newData) => {
  const updatedRecipe = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    newData,
    { new: true, runValidators: true },
  );
  if (!updatedRecipe) {
    throw new Error("Recipe not found");
  }
  return updatedRecipe;
};

export const rateRecipeService = async (userId, recipeId, ratingVal) => {
  return await Rating.findOneAndUpdate(
    { userId, recipeId },
    { value: ratingVal },
    { new: true, upsert: true, runValidators: true },
  ); //upsert = update + insert
};

export const getRecipeRatingService = async (recipeId) => {
  const ratings = await Rating.find({ recipeId });
  const count = ratings.length;
  if (count === 0) {
    return { average: 0, count: 0 };
  }
  const sum = ratings.reduce((sum, r) => sum + r.value, 0);
  const average = Number((sum / count).toFixed(1));
  return { average, count };
};

export const getMyRecipeRatingService = async (userId, recipeId) => {
  const rating = await Rating.findOne({ userId, recipeId });
  if (!rating) {
    return 0;
  }
  return rating.value;
};

export const getRecipeCommentsService = async (recipeId) => {
  return await Comment.find({ recipeId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};

export const getMaxPrepTimeService = async () => {
  const recipe = await Recipe.findOne().sort({ prepTimeMinutes: -1 });
  return recipe?.prepTimeMinutes || 0;
};
