import express from "express";
const router = express.Router();

import notificationController from "../controllers/NotificationController.js";

router.get(
  "/getNotificationsByUserId/:receiverId",
  notificationController.getNotificationsByUserId
);
router.get(
  "/getUnreadNotifications/:receiverId",
  notificationController.getUnreadNotifications
);

router.put(
  "/updateAllNotificationsStatus/:receiverId",
  notificationController.updateAllNotificationsStatus
);

router.put(
  "/updateNotificationStatusById/:id/:receiverId",
  notificationController.updateNotificationStatusById
);

export default router;
