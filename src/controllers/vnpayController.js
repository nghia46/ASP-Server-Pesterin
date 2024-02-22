// controllers/vnpayController.js

import { vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl } from '../config/database/vnpay.js';
import dateFormat from 'dateformat'; 
import querystring from 'qs'; 
import crypto from 'crypto'; 


function createDataString(params) {
    let dataString = '';
    Object.keys(params).forEach(key => {
        dataString += `${key}=${params[key]}&`;
    });
    return dataString.slice(0, -1); // Loại bỏ dấu & cuối cùng
}

export const createPaymentUrl = (req, res, next) => {
    // Lấy thông tin từ request
    let ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;


    var tmnCode = vnp_TmnCode;
    var secretKey = vnp_HashSecret;
    var vnpUrl = vnp_Url;
    var returnUrl = vnp_ReturnUrl;

    var date = new Date();
    
    var orderId = dateFormat(date, 'HHmmss');
    var amount = 200000; 
    var orderInfo = "Thanh toán tiền mặt hàng mới"; 
    var orderType = "sales";
    var locale = 'vn';
    var currCode = 'VND';

    var newDate = new Date();
    newDate.setDate(newDate.getDate() + 1);
    var newCreateDate = dateFormat(newDate, 'yyyymmddHHmmss'); 

    // Tạo các tham số cho VNPAY
    var vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: "Thanh toan cho ma GD: " + orderId,
        vnp_OrderType: orderType,
        vnp_Amount: amount * 100, // Chuyển đổi sang đơn vị tiền tệ của VNPAY (VNĐ -> xu)
        vnp_ReturnUrl: returnUrl,
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
    // Xử lý kết quả trả về từ VNPAY
    // Implement code như trong router.get('/vnpay_return') ở trên
};
