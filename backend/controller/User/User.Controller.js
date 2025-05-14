import {
  sendError,
  sendSuccessResponse,
} from "../../utils/responseFormatter.js";
import UsersModel from "../../model/Users.Model.js";
import mongoose from "mongoose";
import { userByEmail, userById } from "../../services/User.Services.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  getUserResponseWithoutPassword,
  getUserWithAuthToken,
} from "../../utils/userResponseFormatter.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, email, password } = req.body || {};

    // Validate required fields
    if (!firstName || !email || !password) {
      return sendError(res, "First Name, email, and password are required");
    }

    // Check existing user
    const existingUser = await userByEmail(email);
    if (existingUser) {
      return sendError(res, "User already exists");
    }

    // Convert to Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };

    const savedUser = await UsersModel.create(newUser);

    return sendSuccess(res, "User created successfully", savedUser, 201);
  } catch (error) {
    return sendError(res, "Error creating user", error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UsersModel.find();
    sendSuccessResponse(res, "Users retrieved successfully", users);
  } catch (error) {
    sendError(res, "Error retrieving users", error);
  }
};

export const getUserById = async (req, res) => {
  try {
    // check if userId is present in the request params
    if (!req.params.id) {
      return sendError(res, "User ID is required", {});
    }

    // Validate the userId format is valid
    if (mongoose.Types.ObjectId.isValid(req.params.id) === false) {
      return sendError(res, "Invalid User ID format", {});
    }

    const userId = req.params.id;
    const user = await userById(userId);
    if (!user) {
      return sendError(res, "User not found", {});
    }
    sendSuccessResponse(res, "User retrieved successfully", user);
  } catch (error) {
    sendError(res, "Error retrieving user", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    //validate the request body if user present
    if (!req.body) {
      return sendError(res, "User data is required", {});
    }
    // Validate required fields
    const { email, password } = req.body;
    if (!email || !password) {
      return sendError(res, "Email and password are required", {});
    }

    // Check if the user already exists
    const existingUser = await userByEmail(email);
    if (!existingUser) {
      return sendError(res, "User email not found", {});
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return sendError(res, "Enter correct account password", {});
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_DURATION,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    sendSuccessResponse(
      res,
      "User logged in successfully",
      getUserWithAuthToken(existingUser, token)
    );
  } catch (error) {
    sendError(res, "Error logging in user", error);
  }
};
