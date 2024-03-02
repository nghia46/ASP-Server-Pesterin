import express from "express";
const router = express.Router();

import saveController from "../controllers/SaveController.js";

router.post("/saveArtwork", saveController.saveArtToBookmark);
router.get("/getAllArts/:userId", saveController.getAllArtIDsForUser);
router.delete("/", saveController.removeArtFromBookmark);

export default router;
