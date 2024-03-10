import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment.comments",
      required: true,
    },
    replyComments: [
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
        replyContent: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ReplyComment = mongoose.model("ReplyComment", schema);
