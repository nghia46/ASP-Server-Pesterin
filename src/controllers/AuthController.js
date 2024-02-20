class AuthController {
  // [POST] /api/v1/auth/login
  async login(req, res, next) {
    res.status(200).json({ message: "Success" });
  }

  // [POST] /api/v1/auth/signup
  async signup(req, res, next) {}
}

export default new AuthController();
