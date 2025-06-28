import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export const authMiddleware = ( req: Request, res: Response, next: NextFunction ) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token provided" })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as { id: string; role: string }
    next()
  } catch {
    return res.status(403).json({ message: "Invalid token" })
  }
}