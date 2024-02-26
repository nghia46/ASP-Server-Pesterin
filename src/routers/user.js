import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";

<<<<<<< HEAD
router.get("/getUserById/:id", userController.getUserById);
=======
router.get("/getUser", userController.getUser);
router.get("/getUserById/:id", userController.getUserById);
router.post("/updateUser/:id", userController.updateUser);
>>>>>>> 85187b7ef94179818575957e4c4143cb09f7143c

export default router;
