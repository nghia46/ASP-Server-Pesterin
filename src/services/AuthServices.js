import { User } from "../models/User.js";
import { generateTokens } from "../utils/generateTokens.js";
class AuthService {
  async login(loginData) {
    try {
      let user;
    } catch (error) {
      throw error;
    }
  }

  async google(userData) {
    try {
      let user;
      user = await User.findOne({ email: userData.email });
      if (user) {
        return generateTokens(user);
      } else {
        user = new User({
          firstName: userData.given_name,
          lastName: userData.family_name,
          userName: userData.name,
          email: userData.email,
          avatar: userData.picture,
        });
        await user.save();
        const tokens = await generateTokens(user);
        return tokens;
      }
    } catch (error) {
      throw error;
    }
  }

  async signup(userData) {
    try {
      var newUser = new User(userData);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
