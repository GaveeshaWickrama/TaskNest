const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');  // Import controller

// Define routes and link them to the controller functions
router.post('/register', registerUser);  // Link register to the controller
router.post('/login', loginUser);  // Link login to the controller

module.exports = router;
