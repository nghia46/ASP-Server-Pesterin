import mongoose from "mongoose";
const reportSchema = new mongoose.Schema(
    {
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

export const Report =  mongoose.model("Report", reportSchema);