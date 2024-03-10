import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    isWatermark: {
      type: Boolean,
      default: false,
    },

    countSave: {
      type: Number,
    },
    countDownload: {
      type: Number,
    },
    countAds: {
      type: Number,
    },
    countPostPrivate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Feature = mongoose.model("Feature", schema);
