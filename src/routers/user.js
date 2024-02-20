import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";

router.get("/getUser", userController.getUser);

export default router;
