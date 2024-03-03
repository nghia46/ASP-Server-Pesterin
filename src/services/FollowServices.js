import { Follow } from "../models/Follow.js";

class FollowService {
  async create(followerId, followingId) {
    try {
      // Validate input
      if (!followerId || !followingId) {
        throw new Error("followerId and followingId are required");
      }

      // Check if the follow relationship already exists
      const existingFollow = await Follow.findOne({ followerId, followingId });

      if (existingFollow) {
        // If already following, you can handle it as per your requirements
        console.log(`User ${followerId} is already following ${followingId}`);
        return existingFollow;
      }

      // If not following, create a new follow relationship
      const newFollow = await Follow.create({ followerId, followingId });
      // console.log(`User ${followerId} is now following ${followingId}`);
      return newFollow;
    } catch (error) {
      console.error("Error while creating follow relationship:", error.message);
      throw error;
    }
  }

  async getFollower(followingId) {
    try {
      // Tìm các bản ghi trong Follow có followingId tương ứng
      const followers = await Follow.find({ followingId: followingId });

      // Trích xuất followerId từ các bản ghi tìm được
      const followerIds = followers.map((follower) => follower.followerId);
      return followerIds;
    } catch (error) {
      throw error;
    }
  }

  async getFollowing(followerId) {
    try {
      // Tìm các bản ghi trong Follow có followerId tương ứng
      const followings = await Follow.find({ followerId: followerId });

      // Trích xuất followingId từ các bản ghi tìm được
      const followingIds = followings.map((following) => following.followingId);
      return followingIds;
    } catch (error) {
      throw error;
    }
  }

  async deleteFollow(followerId, followingId) {
    try {
      const result = await Follow.deleteOne({
        followerId: followerId,
        followingId: followingId,
      });

      if (result.deletedCount === 0) {
        throw new Error("Không tìm thấy bản ghi để xóa");
      }
      // console.log(`User ${followerId} is unfollow ${followingId}`);
      return { success: true, message: "Bản ghi đã được xóa thành công" };
    } catch (error) {
      throw error;
    }
  }
}

export default new FollowService();
