import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    members: [memberSchema],
    lastMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", schema);
