import { User } from "../models/User.js";

class UserService {
  async getUserById(userId) {
    try {
      const viewUser = await User.findOne({ _id: userId });
      if (!viewUser) {
        throw new Error("User not found");
      }
      return viewUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(userId, updateUserData) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }

      const model = {
        firstName: updateUserData.firstName,
        lastName: updateUserData.lastName,
        about: updateUserData.about,
        website: updateUserData.website,
        userName: updateUserData.userName,
        avatar: updateUserData.avatar
      };

      const userUpdate = await User.updateOne({ _id: userId }, model);
      return userUpdate;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
