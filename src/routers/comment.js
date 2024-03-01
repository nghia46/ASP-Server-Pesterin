import express from "express";
const router = express.Router();

import commentController from "../controllers/CommentController.js";

router.post("/post", commentController.post);
router.get("/get-all-by-artId/:artId", commentController.getAllByArtId);

export default router;
