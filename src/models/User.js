import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true,
    },
    roleID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    packageID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
