import { User } from "../models/User.js";
import { Follow } from "../models/Follow.js";
import { Notification } from "../models/Notification.js";

class NotificationService {
  async sendPostArtworkNotificationToFollowers(newArt) {
    try {
      // Fetch the user information based on userId
      const user = await User.findById(newArt.userId);

      if (!user) {
        console.error("User not found");
        return;
      }
      const followers = await Follow.find({ followingId: newArt.userId });
      followers.forEach(async (follower) => {
        const followerUser = await User.findById(follower.followerId);
        const notificationData = {
          followerId: followerUser._id,
          posterId: user._id,
          posterAvatar: user.avatar,
          type: "new_art_posted",
          content: `<span style="font-weight: 600">${user.userName}</span> added new Artwork: <span style="font-weight: 600">${newArt.title}</span>`,
          hyperLink: `/pin/${newArt._id}`,
        };

        // Save notification to Notification table
        await this.saveNotification(notificationData);
      });
    } catch (error) {
      console.error("Error sending notification to followers:", error);
    }
  }

  async saveNotification(notificationData) {
    try {
      const notification = new Notification(notificationData);
      await notification.save();
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  }

  async getNotificationsByUserId(followerId) {
    try {
      const notifications = await Notification.find({
        followerId: followerId,
      }).sort({ createdAt: -1 });
      return notifications;
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  }

  async getUnreadNotifications(followerId) {
    try {
      const notifications = Notification.find({
        followerId: followerId,
        status: false,
      });
      return notifications;
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  }

  async updateAllNotificationsStatus(followerId) {
    try {
      await Notification.updateMany(
        { followerId: followerId },
        { $set: { status: true } },
        { new: true }
      );

      const updatedNotifications = await Notification.find({
        followerId: followerId,
      });

      return updatedNotifications;
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  }

  async updateNotificationStatusById(id, followerId) {
    try {
      const updatedNotification = await Notification.findByIdAndUpdate(
        id,
        { $set: { status: true } },
        { new: true }
      );

      if (!updatedNotification) {
        throw new Error("Notification not found");
      }

      const updatedNotifications = await Notification.find({
        followerId: followerId,
      });

      return updatedNotifications;
    } catch (error) {
      console.error("Error saving notification:", error);
    }
  }
}

export default new NotificationService();
