import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";

router.get("/getUserById/:id", userController.getUserById);

export default router;
