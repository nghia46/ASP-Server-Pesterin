import express from "express";
const router = express.Router();

import authController from "../controllers/AuthController.js";

router.post("/login", authController.login);
router.post("/google", authController.google);
router.post("/signup", authController.signup);
router.post("/token", authController.refreshAccessToken);
router.post("/logout", authController.logout);

export default router;
