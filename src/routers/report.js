import express from "express";
const router = express.Router();

import reportController from "../controllers/ReportController.js";

router.post("/", reportController.createReport);

export default router;

