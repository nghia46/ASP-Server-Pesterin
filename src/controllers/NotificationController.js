import notificationService from "../services/NotificationServices.js";

class NotificationController {
  async getNotificationsByUserId(req, res) {
    try {
      const { receiverId } = req.params;
      const notifications = await notificationService.getNotificationsByUserId(
        receiverId
      );
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUnreadNotifications(req, res) {
    try {
      const { receiverId } = req.params;
      const notifications = await notificationService.getUnreadNotifications(
        receiverId
      );
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateAllNotificationsStatus(req, res) {
    try {
      const { receiverId } = req.params;
      const notifications =
        await notificationService.updateAllNotificationsStatus(receiverId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateNotificationStatusById(req, res) {
    try {
      const { id, receiverId } = req.params;
      const notifications =
        await notificationService.updateNotificationStatusById(id, receiverId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new NotificationController();
