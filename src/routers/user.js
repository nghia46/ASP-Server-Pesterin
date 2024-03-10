import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";

router.get("/getUserById/:id", userController.getUserById);
router.post("/updateUser/:id", userController.updateUser);
router.get("/getListUserByName/:userName", userController.getListUserByName);
router.post("/updateStatusUser/:id", userController.updateStatusUser);
router.get("/getListUser", userController.getListUser);
router.get("/getListUserByEmail/:email", userController.getListUserByEmail);

export default router;
