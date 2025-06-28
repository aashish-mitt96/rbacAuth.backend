import { z } from "zod"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

import { User } from "../models/User.js"

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]).optional()
})

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = signupSchema.parse(req.body)
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: role ?? "user" })
    res.status(201).json({ message: "User created", user: { email: user.email, role: user.role }})
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const schema = z.object({ email: z.string().email(), password: z.string().min(6) })
    const { email, password } = schema.parse(req.body)
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" })
    res.json({ token, user: { email: user.email, role: user.role }})
  } catch (err: any) {
    res.status(400).json({ message: err.message })
  }
}

export const dashboard = (req: Request, res: Response) => {
  res.json({ message: `Welcome ${req.user?.role}` })
}
