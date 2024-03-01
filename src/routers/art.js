import express from "express";
import ArtController from "../controllers/ArtController.js";
const router = express.Router();

router.get("/getArtwork", ArtController.getAllArtwork);
router.get("/getArtworkById/:id", ArtController.getAllArtworkById);
router.get("/searchArtwork/:tag", ArtController.searchArtwork);
router.post("/postArtwork", ArtController.addArtwork);
export default router;
