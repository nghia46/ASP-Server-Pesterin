import express from "express";
const router = express.Router();

import messageController from "../controllers/MessageController.js";

router.post("/newMessage", messageController.newMessage);
router.get("/getMessage/:conversationId", messageController.getMessage);
router.get("/getMessageUnseen/:userId", messageController.getMessageUnseen);
router.get(
  "/markMessagesAsSeen/:conversationId/:userId",
  messageController.markMessagesAsSeen
);

export default router;
