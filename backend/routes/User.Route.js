import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controller/User/User.Controller.js";

const route = express.Router();

route.get("/", getAllUsers);
route.post("/", createUser);
route.get("/:id", getUserById);

export default route;
