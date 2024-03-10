import mongoose from "mongoose";

const schema = new mongoose.Schema({
  artId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Art",
    required: true,
  },
  reactions: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      reaction: {
        type: String,
        default: null,
        required: true,
      },
    },
  ],
});

export const Reaction = mongoose.model("Reaction", schema);
