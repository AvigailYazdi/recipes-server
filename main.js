import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./DB/db.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import { changeUserRoleController, getAllUsersController, getMeController, getUserFavoritesController, loginUserController, registerUserController } from "./controllers/userController.js";
import { addRecipeController, addToFavoriteController, deleteRecipeController, getAllRecipesController, getRecipeByIdController, getRecipeCommentsController, getRecipeRatingController, rateRecipeController, removeFromFavoriteController, updateRecipeController } from "./controllers/recipeController.js";
import { requireAdmin } from "./middlewares/requireAdmin.js";
import { addCommentController } from "./controllers/commentController.js";
import { optionalAuth } from "./middlewares/optionalAuth.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

await connectDB(process.env.MONGO_URI);

//USERS
app.post("/api/users/register", registerUserController);

app.post("/api/users/login", loginUserController);

app.get("/api/users/favorites", verifyToken, getUserFavoritesController);

app.get("/api/users", verifyToken, requireAdmin, getAllUsersController);

app.get("/api/users/me", verifyToken, getMeController);

app.patch("/api/users/role/:id", verifyToken, requireAdmin, changeUserRoleController);

//RECIPES
app.post("/api/recipes", verifyToken, requireAdmin, addRecipeController);

app.delete("/api/recipes/:id", verifyToken, requireAdmin, deleteRecipeController);

app.put("/api/recipes/:id", verifyToken, requireAdmin, updateRecipeController);

app.get("/api/recipes", optionalAuth, getAllRecipesController);

app.get("/api/recipes/:id", optionalAuth, getRecipeByIdController)

app.post("/api/recipes/favorite/:id", verifyToken, addToFavoriteController);

app.delete("/api/recipes/favorite/:id", verifyToken, removeFromFavoriteController);

app.post("/api/recipes/rating/:id", verifyToken, rateRecipeController);

app.get("/api/recipes/rating/:id", getRecipeRatingController);

app.get("/api/recipes/comments/:id", getRecipeCommentsController);

//COMMENTS
app.post("/api/recipes/comments/:id", verifyToken, addCommentController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

