import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderAvatar: {
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
