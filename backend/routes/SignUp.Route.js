import express from "express";
import { createUser } from "../controller/User/User.Controller.js";

const route = express.Router();

route.post("/", createUser);

export default route;
