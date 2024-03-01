import express from "express";
const router = express.Router();

import replyCommentController from "../controllers/ReplyCommentController.js";

router.post("/post", replyCommentController.post);
router.get(
  "/get-all-by-commentId/:commentId",
  replyCommentController.getAllReplyByCommentId
);

export default router;
