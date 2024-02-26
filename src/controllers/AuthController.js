import AuthService from "../services/AuthServices.js";

class AuthController {
  // [POST] /api/v1/auth/login
  async login(req, res, next) {
    try {
      const loginData = req.body;
      const loginInfo = await AuthService.login(loginData);
      res.status(200).json(loginInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/auth/google
  async google(req, res, next) {
    try {
      const googleAccess = await AuthService.google(req.body);
      res.status(200).json(googleAccess);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }

  // [POST] /api/v1/auth/signup
  async signup(req, res, next) {
    try {
      const userData = await AuthService.signup(req.body);
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error.message });
      next();
    }
  }
}

export default new AuthController();
