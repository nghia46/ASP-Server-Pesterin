import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Art = mongoose.model("Art", schema);
