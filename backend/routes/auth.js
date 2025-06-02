import express from "express"
import { body } from "express-validator"
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Register route
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  registerUser,
)

// Login route
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginUser,
)

// Get user profile (protected route)
router.get("/profile", auth, getUserProfile)

export default router
