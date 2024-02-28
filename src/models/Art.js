import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "any",
    },
    title: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    description: {
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

export const Art = mongoose.model("Art", schema);
