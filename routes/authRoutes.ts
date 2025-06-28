import express from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js"
import { roleMiddleware } from "../middlewares/roleMiddleware.js"
import { signup, login, dashboard } from "../controllers/authController.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/dashboard", authMiddleware, dashboard)
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin" })
})
router.get("/user", authMiddleware, roleMiddleware(["user"]), (req, res) => {
  res.json({ message: "Welcome User" })
})

export default router
