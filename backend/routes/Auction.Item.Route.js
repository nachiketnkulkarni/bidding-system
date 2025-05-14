// this is the route file for auction items

import express from "express";
import {
  createAuctionItem,
  deleteAuctionItem,
  getAllAuctionItems,
  getAuctionItemById,
  updateAuctionItem,
} from "../controller/AuctionItem.Controller.js";

const route = express.Router();

route.get("/", getAllAuctionItems);
route.post("/", createAuctionItem);
route.get("/:id", getAuctionItemById);
route.put("/:id", updateAuctionItem);
route.delete("/:id", deleteAuctionItem);

export default route;
