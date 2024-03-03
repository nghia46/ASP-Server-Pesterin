import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    posterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    posterAvatar: {
      type: String,
    },
    type: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    hyperLink: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("Notification", schema);
