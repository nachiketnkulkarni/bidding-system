import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: "Invalid URL format for profile picture",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    auctionItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AuctionItem",
      },
    ],
  },
  { timestamps: true }
);

// Transform JSON output
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model("User", UserSchema);
