import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    followerId: {
      type: String,
      default: "",
    },
    followingId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Follow = mongoose.model("Follow", schema);
