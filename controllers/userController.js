import {
  changeUserRoleService,
  getAllUsersService,
  getMeService,
  getUserFavoritesService,
  loginUserService,
  registerUserService,
} from "../services/userService.js";

export const registerUserController = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json({
      message: "Register successfully",
      user: result.user,
      token: result.token,
    });
  } catch (e) {
    res.status(400).json({ message: "Error in register", error: e.message });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    res.status(200).json({
      message: "Login successfully",
      user: result.user,
      token: result.token,
    });
  } catch (e) {
    res.status(400).json({ message: "Login error", error: e.message });
  }
};

export const getUserFavoritesController = async (req, res) => {
  try {
    const favorites = await getUserFavoritesService(req.user.sub);
    res.status(200).json(favorites);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in getting user's favorites", error: e.message });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in getting all users", error: e.message });
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = await getMeService(req.user.sub);
    res.status(200).json(user);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in getting user", error: e.message });
  }
};

export const changeUserRoleController = async (req, res) => {
  try {
    const newUser = await changeUserRoleService(req.params.id, req.body.role);
    res.status(200).json(newUser);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in changing user's role", error: e.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    res.status(200).json(deletedUser);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Error in changing user's role", error: e.message });
  }
};
