import express from "express";
const router = express.Router();

import notificationController from "../controllers/NotificationController.js";

router.get(
  "/getNotificationsByUserId/:followerId",
  notificationController.getNotificationsByUserId
);
router.get(
  "/getUnreadNotifications/:followerId",
  notificationController.getUnreadNotifications
);

router.put(
  "/updateAllNotificationsStatus/:followerId",
  notificationController.updateAllNotificationsStatus
);

router.put(
  "/updateNotificationStatusById/:id/:followerId",
  notificationController.updateNotificationStatusById
);

export default router;
