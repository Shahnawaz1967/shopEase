import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

// Import routes
import authRoutes from "./routes/auth.js"
import cartRoutes from "./routes/cart.js"
import connectDB from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// 🔐 Security middleware
app.use(helmet())

// ⚡ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)

// 🌐 CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
)

//  Body parser
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

connectDB()

//  Routes
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)

// ✅ Health Check
app.get("/api/health", (req, res) => {
  res.json({
    message: "ModernShop API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  })
})

// ❌ 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  })
})

// 🧯 Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

app.listen((PORT),()=>{
  console.log(`server is running on ${ PORT}`)
})



