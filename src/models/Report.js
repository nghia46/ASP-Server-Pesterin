import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 0,
    },
    artID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Art",
    },
    reportTitle: {
      type: String,
      default: "",
    },
    reportDescription: {
      type: String,
      default: "",
    },
    reportType: {
      type: String,
      default: "",
    },
    reportStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", schema);
