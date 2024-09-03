import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/taskController";
import { verifyUser } from "../utils";
const taskRoute = express.Router();

taskRoute.get("/get-tasks", verifyUser, getTasks);
taskRoute.put("/update-task/:id", verifyUser, updateTask);
taskRoute.put("/update-status/:id", verifyUser, updateStatus);
taskRoute.post("/create-task", verifyUser, createTask);
taskRoute.delete("/delete-task/:id", verifyUser, deleteTask);

export { taskRoute };
