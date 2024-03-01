import mongoose from "mongoose";

const schema = new mongoose.Schema({
  artId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Art",
    required: true,
  },
  comments: [
    {
      author: {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        userName: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          required: true,
        },
      },
      commentContent: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      replies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReplyComment",
        default: null,
      },
    },
  ],
});

export const Comment = mongoose.model("Comment", schema);
