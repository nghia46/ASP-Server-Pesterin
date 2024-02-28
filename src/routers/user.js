import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

router.get("/getUserById/:id", userController.getUserById);
router.post("/updateUser/:id", userController.updateUser);

export default router;
