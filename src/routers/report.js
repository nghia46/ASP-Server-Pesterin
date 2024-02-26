import express from "express";
const router = express.Router();

import reportController from "../controllers/ReportController.js";
// authen user
router.post("/", reportController.createReport);
// author admin
// router.use(authorMiddleware("admin"));
router.get("/:artID", reportController.getReportByArtId);
router.put("/:reportID", reportController.updateReportStatus);

export default router;

