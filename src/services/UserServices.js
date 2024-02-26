import { User } from "../models/User.js";

class UserService {
  async getUserById(userId) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
