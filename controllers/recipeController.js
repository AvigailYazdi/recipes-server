import { addRecipeService, addToFavoriteService, deleteRecipeService, getAllRecipesService, getRecipeByIdService, getRecipeCommentsService, getRecipeRatingService, rateRecipeService, removeFromFavoriteService, updateRecipeService } from "../services/recipeService.js"

export const addRecipeController = async (req, res) => {
    try {
        const recipe = await addRecipeService(req.body);
        res.status(201).json(recipe);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in adding recipe", error: e.message });
    }
}

export const getAllRecipesController = async (req, res) => {
    try {
        const { category, difficulty, maxTime, tag, q, sort } = req.query;
        const filter = {};
        if (req.user?.role !== "admin") {
            filter.status = "published";
        }
        if (category) {
            filter.categories = category;
        }
        if (difficulty) {
            filter.difficulty = difficulty;
        }
        if (maxTime) {
            filter.prepTimeMinutes = { $lte: Number(maxTime) }; // $lte - less than or equal
        }
        if (tag) { //can be more than one tag
            const tags = Array.isArray(tag) ? tag : [tag];
            filter.tags = { $in: tags } // $in- not all tags
        }
        if (q) {//for search in title or description
            filter.$or = [
                { title: { $regex: q, $options: "i" } }, //$options: "i" -  case insensitive
                { description: { $regex: q, $options: "i" } }
            ];
        }
        const recipes = await getAllRecipesService(filter, sort);
        res.status(200).json(recipes);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in getting all recipes", error: e.message });
    }
}

export const getRecipeByIdController = async (req, res) => {
    try {
        let isAdmin;
        if(req.user?.role === "admin"){
            isAdmin = true;
        }
        else{
            isAdmin = false;
        }
        const recipe = await getRecipeByIdService(req.params.id, isAdmin);
        res.status(200).json(recipe);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in getting recipe", error: e.message });

    }
}

export const addToFavoriteController = async (req, res) => {
    try {
        const favorites = await addToFavoriteService(req.user.sub, req.params.id);
        res.status(200).json(favorites);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in adding to favorites", error: e.message });
    }
}

export const removeFromFavoriteController = async (req, res) => {
    try {
        const favorites = await removeFromFavoriteService(req.user.sub, req.params.id);
        res.status(200).json(favorites);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in removing from favorites", error: e.message });
    }
}

export const deleteRecipeController = async (req, res) => {
    try {
        const deletedRecipe = await deleteRecipeService(req.params.id);
        res.status(200).json(deletedRecipe);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in deleting recipe", error: e.message });
    }
}

export const updateRecipeController = async (req, res) => {
    try {
        const updatedRecipe = await updateRecipeService(req.params.id, req.body);
        res.status(200).json(updatedRecipe);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in updating recipe", error: e.message });
    }
}

export const rateRecipeController = async (req, res) => {
    try {
        const rating = await rateRecipeService(req.user.sub, req.params.id, req.body.value)
        res.status(200).json(rating);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in rating recipe", error: e.message });
    }
}

export const getRecipeRatingController = async (req, res) => {
    try {
        const result = await getRecipeRatingService(req.params.id);
        res.status(200).json(result);
    }
    catch (e) {
        return res.status(400).json({ message: "Error in getting recipe's rating", error: e.message });
    }
}

export const getRecipeCommentsController = async (req, res) => {
    try {
        const comments = await getRecipeCommentsService(req.params.id);
        res.status(200).json(comments);
    }
    catch (e) {
        res.status(400).json({ message: "Error in getting recipe's comments", error: e.message });
    }
}