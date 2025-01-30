const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authCtrl = require('../controllers/auth');

// Rate limiter for login attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 login attempts
  message: 'Too many login attempts, please try again later.',
});

// Signup & Login
router.post('/signup', authCtrl.signUp);
router.post('/login', authLimiter, authCtrl.login);

module.exports = router;
