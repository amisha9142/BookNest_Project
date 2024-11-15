const express = require("express");
const rateLimit = require('express-rate-limit');
const {
  registerUser,
  verifyOtp,
  getUserProfile,
  updateUserProfile,
  changePassword,
  loginUser,
  forgotPassword,
  resetPassword,
  deleteUser,
  logoutUser,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: "Too many login attempts, please try again after 15 minutes"
});

router.post("/register", registerUser);
router.post("/verify-otp", authMiddleware, verifyOtp);
router.post("/login",loginLimiter, loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/logout", logoutUser);

module.exports = router;
