import { User } from "../models/User.js";

class UserService {
  async getUserById(userId) {
    try {
      const viewUser = await User.findOne({ _id: userId });
      if (!viewUser){
        throw new Error("User not found");
      }
      return viewUser;
    } catch (error) {
        throw error;
    }
  }

  async updateUserById(userId, updateUserData){
    try {
        const user = await User.findOne({ _id: userId });
        if (!user){
            throw new Error("User not found");
        }
        user.id = userId;
        user.type = updateUserData.type;
        user.email = updateUserData.email;
        user.firstName = updateUserData.firstName; 
        user.lastName = updateUserData.lastName;
        user.dob = updateUserData.dob;
        user.avatar = updateUserData.avatar;
        user.coverPicture = updateUserData.coverPicture;
        user.about = updateUserData.about;
        user.website = updateUserData.website;
        user.password = updateUserData.password;
        user.status = updateUserData.status;

        await User.insertMany(userId, updateUserData);

    } catch (error) {
        throw error;
    }
  }
}

export default new UserService();
