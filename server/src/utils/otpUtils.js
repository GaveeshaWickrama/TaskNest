const crypto = require('crypto');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

function otpExpiryTime() {
  return new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
}
