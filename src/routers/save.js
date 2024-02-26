import express from "express";
const router = express.Router();

import saveController from "../controllers/SaveController.js";

router.post("/", saveController.saveArtToBookmark);

export default router;
