import express from "express";
const router = express.Router();

import conversationController from "../controllers/ConversationController.js";
router.post("/newConversation", conversationController.newConversation);
router.get("/getConversation/:userId", conversationController.getConversation);
router.get(
  "/getConversationById/:conversationId",
  conversationController.getConversationById
);

export default router;
