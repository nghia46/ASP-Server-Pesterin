import UserService from "../services/UserService.js";

class UserController {
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const modelUpdate = req.body;

      await UserService.updateUserById(id, modelUpdate);
      res.status(200).json("User updated!");
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new UserController();
