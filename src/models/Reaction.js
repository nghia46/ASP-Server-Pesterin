import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    artId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
    reactionType: {
      type: String,
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

export const Art = mongoose.model("Reaction", schema);
