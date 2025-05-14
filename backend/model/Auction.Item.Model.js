import mongoose from "mongoose";

// Individual bid schema for each auction
const BidSchema = new mongoose.Schema({
  user: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Main auction item schema
const AuctionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, required: true },
  startPrice: { type: Number, required: true },
  currentBid: {
    amount: { type: Number },
    user: { type: String },
  },
  bids: [BidSchema],
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active",
  },
  endTime: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for faster queries
AuctionItemSchema.index({ status: 1 });
AuctionItemSchema.index({ endTime: 1 });
AuctionItemSchema.index({ "currentBid.amount": -1 });

AuctionItemSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    // Optionally, convert _id to id
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model("AuctionItem", AuctionItemSchema);
