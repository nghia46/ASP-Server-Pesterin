class UserController {
  // [POST] /api/v1/user/getUser
  async getUser(req, res, next) {
    res.status(200).json({ message: "Success" });
  }
}

export default new UserController();
