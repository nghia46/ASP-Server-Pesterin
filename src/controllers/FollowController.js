import FollowService from "../services/FollowServices.js";

class FollowController {
  async create(req, res) {
    try {
      // Lấy dữ liệu từ params của request
      const { followerId, followingId } = req.params;

      // Gọi service để tạo một bản ghi mới
      const newFollow = await FollowService.create(followerId, followingId);

      // Trả về kết quả cho client
      return res.status(201).json(newFollow);
    } catch (error) {
      // Xử lý lỗi và trả về lỗi cho client
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async getFollower(req, res) {
    try {
      const { followingId } = req.params;

      const listFollower = await FollowService.getFollower(followingId);
      return res.status(201).json(listFollower);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async getFollowing(req, res) {
    try {
      const { followerId } = req.params;

      const listFollowing = await FollowService.getFollowing(followerId);
      return res.status(201).json(listFollowing);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async deleteFollow(req, res) {
    try {
      const { followerId, followingId } = req.params;

      // Gọi service để xóa bản ghi theo followerId và followingId
      const result = await FollowService.deleteFollow(followerId, followingId);

      // Trả về kết quả cho client
      return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      // Xử lý lỗi và trả về lỗi cho client
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}

export default new FollowController();
