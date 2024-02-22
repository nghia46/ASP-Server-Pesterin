import mongoose from 'mongoose';

const vnpaySchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bankCode: {
      type: String,
    },
    orderDescription: {
      type: String,
      required: true,
    },
    orderType: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'vn',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    paymentDate: {
      type: Date,
    },
    // Thêm các trường khác nếu cần
  },
  {
    timestamps: true,
  }
);

const VnPayTransaction = mongoose.model('VnPayTransaction', vnpaySchema);

export default VnPayTransaction;
