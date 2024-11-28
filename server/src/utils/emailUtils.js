const nodemailer = require('nodemailer');

async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred service
    auth: {
      user: process.env.EMAIL_USER, // Environment variable for email
      pass: process.env.EMAIL_PASS, // Environment variable for password
    },
  });

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`, // Use your email
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It will expire in 15 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOTPEmail;
