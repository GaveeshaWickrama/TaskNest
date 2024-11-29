const nodemailer = require('nodemailer');

// console.log('Email Service:', process.env.EMAIL_SERVICE);
// console.log('Email User:', process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = transporter;
