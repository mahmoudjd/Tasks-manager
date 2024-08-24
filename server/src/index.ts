import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { taskRoute } from "./routes/taskRoute";
import { authRoute } from "./routes/authRoute";
import mongoose from "mongoose";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/tasks", taskRoute);
app.use("/auth", authRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

// Server starten
app.listen(process.env.PORT, () => {
  console.log("server is running on Port 8080...");
});
