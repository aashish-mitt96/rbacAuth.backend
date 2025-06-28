import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
