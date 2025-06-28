import dotenv from "dotenv"
import express from "express"

import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/connectDB.js"

dotenv.config()
const app = express()
app.use(express.json())

app.use("/api", authRoutes)

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
)
