import AuctionItem from "../model/Auction.Item.Model.js";

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("📡 New client connected:", socket.id);

    // Join a specific auction room
    socket.on("join_auction", (auctionId) => {
      socket.join(auctionId);
      console.log(`🔄 User joined auction: ${auctionId}`);
    });

    // User places a bid
    socket.on("place_bid", async ({ auctionId, amount, user }) => {
      try {
        const auction = await AuctionItem.findById(auctionId);
        if (!auction || auction.status !== "active") {
          return socket.emit("error", "Auction not available");
        }

        // Bid must be higher than current or minimum bid
        if (amount <= (auction.currentBid?.amount || auction.minBid)) {
          return socket.emit("error", "Bid must be higher");
        }

        // Save the bid
        const bid = { user, amount };
        auction.currentBid = bid;
        auction.bids.push(bid);
        await auction.save();

        // Notify all users in the room about new bid
        io.to(auctionId).emit("new_bid", {
          auctionId,
          bid,
        });
      } catch (err) {
        console.error("Bid error:", err.message);
        socket.emit("error", "Internal server error");
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
}

export default setupSocket;
