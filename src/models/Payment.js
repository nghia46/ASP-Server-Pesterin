import mongoose from 'mongoose';

const vnpaySchema = new mongoose.Schema(
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
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    // Thêm các trường khác nếu cần
  },
  {
    timestamps: true,
  }
);

const payments = mongoose.model('payment', vnpaySchema);

export default payments;
