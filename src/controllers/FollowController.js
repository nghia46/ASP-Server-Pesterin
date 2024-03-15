import FollowService from "../services/FollowServices.js";

class FollowController {
  async create(req, res) {
    try {
      // Get data from request params
      const { followerId, followingId } = req.params;

      // Call service to create a new record
      const newFollow = await FollowService.create(followerId, followingId);

      // Return results to the client
      return res.status(200).json(newFollow);
    } catch (error) {
      // Handle errors and return errors to the client
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async getFollower(req, res) {
    try {
      const { followingId } = req.params;

      const listFollower = await FollowService.getFollower(followingId);
      return res.status(200).json(listFollower);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async getFollowing(req, res) {
    try {
      const { followerId } = req.params;

      const listFollowing = await FollowService.getFollowing(followerId);
      return res.status(200).json(listFollowing);
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  async deleteFollow(req, res) {
    try {
      const { followerId, followingId } = req.params;

      // Call service to delete records by followerId and followingId
      const result = await FollowService.deleteFollow(followerId, followingId);

      // Return results to the client
      return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
      // Handle errors and return errors to the client
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}

export default new FollowController();
