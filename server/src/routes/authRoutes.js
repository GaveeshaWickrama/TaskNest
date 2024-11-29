const express = require('express');
const router = express.Router();
const { loginUser, requestRegister, verifyOtp, requestPassword, verifyOtpRestPassword } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', requestRegister);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', requestPassword)
router.post('/verify-otp-reset-password', verifyOtpRestPassword )

module.exports = router;
