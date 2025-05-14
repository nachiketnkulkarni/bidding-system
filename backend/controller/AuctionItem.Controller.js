import mongoose from "mongoose";
import AuctionItem from "../model/Auction.Item.Model.js";
import { sendError, sendSuccessResponse } from "../utils/responseFormatter.js";

// Create a new auction item
const createAuctionItem = async (req, res) => {
  try {
    const auctionItem = new AuctionItem(req.body);
    const savedItem = await auctionItem.save();
    // res.status(201).json(savedItem);
    sendSuccessResponse(res, "Auction item created successfully", savedItem);
  } catch (error) {
    sendError(res, "Failed to create auction item", error);
    // res.status(400).json({ error: error.message });
  }
};

// Read all auction items
const getAllAuctionItems = async (req, res) => {
  try {
    const items = await AuctionItem.find();
    sendSuccessResponse(res, "Auction items retrieved successfully", items);
    // res.status(200).json(items);
  } catch (error) {
    sendError(res, "Failed to retrieve auction items", error, 500);
    // res.status(500).json({ error: error.message });
  }
};

// Read a single auction item by ID
const getAuctionItemById = async (req, res) => {
  try {
    // Validate ObjectId present in the request
    if (!req.params.id) {
      return sendError(res, "ID parameter is required", {});
      //   return res.status(400).json({ error: "ID parameter is required" });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return sendError(res, "Invalid ID format", {});
      //   return res.status(400).json({ error: "Invalid ID format" });
    }

    const item = await AuctionItem.findById(req.params.id);
    if (!item) {
      return sendError(res, "Auction item not found", {});
      //   return res.status(404).json({ error: "Auction item not found" });
    }
    sendSuccessResponse(res, "Auction item retrieved successfully", item);
    // res.status(200).json(item);
  } catch (error) {
    sendError(res, "Failed to retrieve auction item", error, 500);
    // res.status(500).json({ error: error.message });
  }
};

// Update an auction item by ID
const updateAuctionItem = async (req, res) => {
  try {
    const updatedItem = await AuctionItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return sendError(res, "Auction item not found", {});
      //   return res.status(404).json({ error: "Auction item not found" });
    }
    sendSuccessResponse(res, "Auction item updated successfully", updatedItem);
    // res.status(200).json(updatedItem);
  } catch (error) {
    sendError(res, "Failed to update auction item", error);
    // res.status(400).json({ error: error.message });
  }
};

// Delete an auction item by ID
const deleteAuctionItem = async (req, res) => {
  try {
    const deletedItem = await AuctionItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return sendError(res, "Auction item not found", {});
      //   return res.status(404).json({ error: "Auction item not found" });
    }
    sendSuccessResponse(res, "Auction item deleted successfully", {});
    // res.status(200).json({ message: "Auction item deleted successfully" });
  } catch (error) {
    sendError(res, "Failed to delete auction item", error);
    // res.status(500).json({ error: error.message });
  }
};

export {
  createAuctionItem,
  getAllAuctionItems,
  getAuctionItemById,
  updateAuctionItem,
  deleteAuctionItem,
};
