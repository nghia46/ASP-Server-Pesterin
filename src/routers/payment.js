import express from "express";
const router = express.Router();

import paymentController from "../controllers/PaymentController.js";

router.get(
  "/create_payment_url/:amount/:accountId/:type",
  paymentController.createPaymentUrl
);
router.get(
  "/return_Url/:accountId/:amount/:type",
  paymentController.vnPayReturn
);

export default router;
