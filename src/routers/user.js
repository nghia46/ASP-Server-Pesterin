import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";

router.get("/getUser", userController.getUser);
router.get("/getUserById/:id", userController.getUserById);
router.post("/updateUser/:id", userController.updateUser)

export default router;
