import UserService from "../services/UserServices.js";

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
}

export default new UserController();
