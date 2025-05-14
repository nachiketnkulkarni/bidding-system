import express from "express";
import http from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import connectWithRetry from "./config/db.js";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import setupSocket from "./socket/socketHandler.js";
import auctionItemRoute from "./routes/Auction.Item.Route.js";
import userRoute from "./routes/User.Route.js";
import loginRoute from "./routes/Login.Route.js";
import SignUpRoute from "./routes/SignUp.Route.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// connect to MongoDB
connectWithRetry();

// Middleware
const FRONTEND_ORIGIN = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN, // <— must be exact, not '*'
    credentials: true, // <— required to allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
});
app.use(limiter);

// Setup Socket.IO handlers
setupSocket(io);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

//All routes
app.use("/api/v1/auctionItem", auctionItemRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/auth/login", loginRoute);
app.use("/api/v1/auth/signup", SignUpRoute);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
