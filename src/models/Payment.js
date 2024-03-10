import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    accountId: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", schema);
