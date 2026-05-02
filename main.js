import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./DB/db.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import { changeUserRoleController, deleteUserController, getAllUsersController, getMeController, getUserFavoritesController, loginUserController, registerUserController } from "./controllers/userController.js";
import { addRecipeController, addToFavoriteController, deleteRecipeController, getAllRecipesController, getMaxPrepTimeController, getMyRecipeRatingController, getRecipeByIdController, getRecipeCommentsController, getRecipeRatingController, rateRecipeController, removeFromFavoriteController, updateRecipeController } from "./controllers/recipeController.js";
import { requireAdmin } from "./middlewares/requireAdmin.js";
import { addAdminReplyController, addCommentController, deleteCommentController, getAllCommentsController } from "./controllers/commentController.js";
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

app.delete("/api/users/:id", verifyToken, requireAdmin, deleteUserController);

//RECIPES
app.post("/api/recipes", verifyToken, requireAdmin, addRecipeController);

app.delete("/api/recipes/:id", verifyToken, requireAdmin, deleteRecipeController);

app.put("/api/recipes/:id", verifyToken, requireAdmin, updateRecipeController);

app.get("/api/recipes", optionalAuth, getAllRecipesController);

app.get("/api/recipes/max-prep-time", getMaxPrepTimeController);

app.get("/api/recipes/:id", optionalAuth, getRecipeByIdController)

app.post("/api/recipes/favorite/:id", verifyToken, addToFavoriteController);

app.delete("/api/recipes/favorite/:id", verifyToken, removeFromFavoriteController);

app.post("/api/recipes/rating/:id", verifyToken, rateRecipeController);

app.get("/api/recipes/rating/:id", getRecipeRatingController);

app.get("/api/recipes/my-rating/:id", verifyToken, getMyRecipeRatingController);

app.get("/api/recipes/comments/:id", getRecipeCommentsController);

//COMMENTS
app.post("/api/recipes/comments/:id", verifyToken, addCommentController);

app.get("/api/comments", verifyToken, requireAdmin, getAllCommentsController);

app.patch("/api/comments/reply/:id", verifyToken, requireAdmin, addAdminReplyController);

app.delete("/api/comments/:id", verifyToken, requireAdmin, deleteCommentController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

