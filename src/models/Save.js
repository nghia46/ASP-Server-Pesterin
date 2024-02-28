
import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
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
    }, {
        timestamps: true,
    });

export const Save =  mongoose.model("Save", saveSchema);