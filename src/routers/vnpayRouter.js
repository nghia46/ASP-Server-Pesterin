// routers/vnpayRouter.js

import express from 'express';
import { createPaymentUrl, vnpayIPN, vnpayReturn } from '../controllers/vnpayController.js'; // Import các hàm cụ thể từ vnpayController.js
import { vnp_ReturnUrl } from '../config/database/vnpay.js';
const router = express.Router();

router.get('/create_payment_url/:amount/:accountId', createPaymentUrl);
router.get("/return_Url/:accountId", vnpayReturn);

export default router;
