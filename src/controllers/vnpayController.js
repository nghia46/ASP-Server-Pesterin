// controllers/vnpayController.js

import { vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl } from '../config/database/vnpay.js';
import dateFormat from 'dateformat'; 
import querystring from 'qs'; 
import crypto from 'crypto'; 
import Payment from '../models/Payment.js'; 

export const createPaymentUrl = (req, res, next) => {
  // Lấy thông tin từ request
  let ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  var tmnCode = vnp_TmnCode;
  var secretKey = vnp_HashSecret;
  var vnpUrl = vnp_Url;
  var returnUrl = vnp_ReturnUrl;

  var date = new Date();
  
  var orderId = dateFormat(date, 'HHmmss');
  var amount = req.params.amount; // Lấy giá trị amount từ params
  var orderInfo = "Thanh toán tiền mặt hàng mới"; 
  var orderType = "sales";
  var locale = 'vn';
  var currCode = 'VND';

  var accountId = req.params.accountId;
  if (!accountId) {
      throw new Error('accountId is required');
  }

  var newDate = new Date();
  newDate.setDate(newDate.getDate() + 1);
  var newCreateDate = dateFormat(newDate, 'yyyymmddHHmmss'); 

  // Tạo các tham số cho VNPAY
  var vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_BankCode: "NCB",
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: "Thanh toan cho ma GD: " + orderId,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100, // Chuyển đổi sang đơn vị tiền tệ của VNPAY (VNĐ -> xu)
      vnp_ReturnUrl: `${returnUrl}/:${accountId}`, // Thêm accountId vào returnUrl
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: newCreateDate
  };

  vnp_Params = sortObject(vnp_Params);
  let signData = querystring.stringify(vnp_Params, { encode: false });

  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  

  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });


  res.redirect(vnpUrl);
};

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

export const vnpayIPN = (req, res, next) => {
    // Xử lý IPN (Instant Payment Notification) từ VNPAY
    // Implement code như trong router.post('/vnpay_ipn') ở trên
};

export const vnpayReturn = (req, res, next) => {
 
  const { vnp_ResponseCode, vnp_TxnRef, vnp_TransactionNo, vnp_Amount, vnp_BankCode, vnp_BankTranNo, vnp_CardType, vnp_PayDate, vnp_OrderInfo, vnp_TransactionStatus } = req.query;
  
  var accountId = req.params.accountId; // Lấy accountId từ URL
  if (!accountId) {
      throw new Error('accountId is required');
  }
  // Kiểm tra kết quả trả về từ VNPAY
  if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
      // Thanh toán thành công, lưu vào MongoDB
      const newPayment = new Payment({
          amount: vnp_Amount,
          accountId: accountId,
          orderId: vnp_TxnRef,
          paymentDate: vnp_PayDate,
          description: vnp_OrderInfo,
          status: 'success' 
      });

      newPayment.save()
          .then(savedPayment => {
              console.log('Payment saved successfully:', savedPayment);
          })
          .catch(error => {
              console.error('Failed to save payment:', error);
          });
  } else {
      // Xử lý trường hợp thanh toán không thành công
      console.error('Payment failed:', { vnp_ResponseCode, vnp_TransactionNo, vnp_TransactionStatus });
  }

  // Redirect hoặc trả về thông báo tùy theo yêu cầu của bạn
};
