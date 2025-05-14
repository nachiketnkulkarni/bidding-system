import express from "express";
import { loginUser } from "../controller/User/User.Controller.js";

const route = express.Router();

route.post("/", loginUser);

export default route;
