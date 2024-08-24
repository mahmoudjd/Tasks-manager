import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { taskRoute } from "./routes/taskRoute";
import { authRoute } from "./routes/authRoute";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tasks", taskRoute);
app.use("/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log("server is running on Port 8080...");
});
