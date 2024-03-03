import notificationService from "../services/NotificationServices.js";

class NotificationController {
  async getNotificationsByUserId(req, res) {
    try {
      const { followerId } = req.params;
      const notifications = await notificationService.getNotificationsByUserId(
        followerId
      );
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUnreadNotifications(req, res) {
    try {
      const { followerId } = req.params;
      const notifications = await notificationService.getUnreadNotifications(
        followerId
      );
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateAllNotificationsStatus(req, res) {
    try {
      const { followerId } = req.params;
      const notifications =
        await notificationService.updateAllNotificationsStatus(followerId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateNotificationStatusById(req, res) {
    try {
      const { id, followerId } = req.params;
      const notifications =
        await notificationService.updateNotificationStatusById(id, followerId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new NotificationController();
