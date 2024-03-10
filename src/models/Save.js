import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    arts: [
      {
        artID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Art",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Save = mongoose.model("Save", schema);
