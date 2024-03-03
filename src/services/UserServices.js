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

  async updateUserById(userId, userUpdate) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("User not found");
      }
      user.avatar = userUpdate.avatar;
      user.firstName = userUpdate.firstName;
      user.lastName = userUpdate.lastName;
      user.userName = userUpdate.userName;
      user.about = userUpdate.about;
      user.website = userUpdate.website;

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getListUserByName(userName) {
    try {

      const regex = new RegExp(userName, 'i');
      const userList = await User.find({ userName: regex });

      return userList;

    } catch (error) {
        throw error;
    }
}

async getListUserByEmail(email) {
  try {
    
    const userList = await User.find({ email });

    return userList;

  } catch (error) {
      throw error;
  }
}

async getListUser() {
  try {

    const userList = await User.find();

    return userList;

  } catch (error) {
      throw error;
  }
}

async updateStatus(userId, updateUser) {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    user.status = updateUser.status;

    const userUpdate = await user.save();
    return userUpdate;
    
  } catch (error) {
      throw error;
  }
}

  
}

export default new UserService();
