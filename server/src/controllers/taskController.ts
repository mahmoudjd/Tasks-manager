import { Request, Response } from "express";
import { Task } from "../models/task.model";

export const getTasks = async (req: Request | any, res: Response) => {
  const { user } = req.user;
  try {
    const tasks = await Task.find({ userId: user._id });
    if (!tasks) {
      return res.status(404).json({
        error: true,
        message: "not found tasks",
      });
    }

    return res.status(200).json({
      error: false,
      tasks,
      message: "get tasks successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server errror",
    });
  }
};

export const createTask = async (req: Request | any, res: Response) => {
  const { name, content, completed } = req.body;
  const { user } = req.user;
  try {
    const task = await Task.create({
      name,
      content,
      completed,
      userId: user._id,
    });

    if (!task) {
      return res.status(404).json({
        error: true,
        message: "task cann't create",
      });
    }
    return res.status(201).json({
      error: false,
      task,
      message: "task created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server errror",
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { name, content, completed } = req.body;
  const { id } = req.params;
  try {
    const updatedAt = Date.now();

    const task = await Task.findOneAndUpdate(
      { _id: id },
      { $set: { name, content, completed, updatedAt } },
    );

    if (!task) {
      return res.status(404).json({ error: true, messsage: "not found task" });
    }

    return res.status(200).json({
      error: false,
      task,
      message: "status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server errror",
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { completed } = req.body;
  const { id } = req.params;
  try {
    const updatedAt = Date.now();

    const task = await Task.findOneAndUpdate(
      { _id: id },
      { $set: { completed, updatedAt } },
    );

    if (!task) {
      return res.status(404).json({ error: true, messsage: "not found task" });
    }

    return res.status(200).json({
      error: false,
      task,
      message: "status updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server errror",
    });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return res.status(404).json({
        error: true,
        message: "not found task",
      });
    }
    return res.status(200).json({
      error: false,
      message: "task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "internal server errror",
    });
  }
};
