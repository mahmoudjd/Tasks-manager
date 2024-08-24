import express from "express";
import {
  getTasks,
  createTask,
  statusUpdate,
  deleteTask,
} from "../controllers/taskController";
import { verifyUser } from "../utils";
const taskRoute = express.Router();

taskRoute.get("/get-tasks", verifyUser, getTasks);
taskRoute.put("/update-status/:id", verifyUser, statusUpdate);
taskRoute.post("/create-task", verifyUser, createTask);
taskRoute.delete("/delete-task/:id", verifyUser, deleteTask);

export { taskRoute };
