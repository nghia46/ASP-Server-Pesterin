import express from "express";
import CategoryController from "../controllers/CategoryController.js";
const router = express.Router();



router.post("/addCategory", CategoryController.addCategory);

export default router;