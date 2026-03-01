import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUserService = async ({ name, email, password }) => {
    if (!name || !email || !password) {
        throw new Error("One or more details are missing");
    }
    if (await User.findOne({ email })) {
        throw new Error("Email already exists");
    }
    const newUser = new User({ name, email, passwordHash: password });
    const savedUser = await newUser.save();
    const token = jwt.sign(
        { sub: savedUser._id, role: savedUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    const userObj = savedUser.toObject();
    delete userObj.passwordHash;
    return { user: userObj, token };
}

export const loginUserService = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("One or more details are missing");
    }
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
        throw new Error("Invalid details");
    }
    if (!bcrypt.compareSync(password, user.passwordHash)) {
        throw new Error("Invalid details");
    }
    const token = jwt.sign(
        { sub: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
    const userObj = user.toObject();
    delete userObj.passwordHash;
    return { user: userObj, token };
}

export const getUserFavoritesService = async (userId) => {
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
        throw new Error("User not found");
    }
    return user.favorites;
}

export const getAllUsersService = async () => {
    const users = await User.find({}).select("name email role");;
    return users;
}

export const getMeService = async (userId) => {
    const user = await User.findById(userId);
    if(!user){
        throw new Error("Usr not found");
    }
    return user;
}

export const changeUserRoleService = async (userId, role) => {
    if (role !== "admin" && role !== "user") {
        throw new Error("Invalid role")
    }
    const user = await User.findOneAndUpdate({ _id: userId }, { role }, { new: true, runValidators: true }).select("name email role");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}