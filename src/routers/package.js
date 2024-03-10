import express from "express";
const router = express.Router();

import packageController from "../controllers/PackageController.js";
router.post("/addPackage", packageController.addPackage);
router.post("/addFeature", packageController.addFeature);
router.post("/free-trial-package", packageController.freeTrialPackage);
router.get("/getPackageName/:id", packageController.getPackageName);
router.get("/getFeatureByUserId/:userId", packageController.getFeatureByUserId);
router.get(
  "/decreaseDownloadCount/:userId/:packageId",
  packageController.decreaseDownloadCount
);
export default router;
