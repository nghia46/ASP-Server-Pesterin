// routers/vnpayRouter.js

import express from 'express';
import { createPaymentUrl, vnpayIPN, vnpayReturn } from '../controllers/vnpayController.js'; // Import các hàm cụ thể từ vnpayController.js
const router = express.Router();

router.get('/create_payment_url', createPaymentUrl);


export default router;
