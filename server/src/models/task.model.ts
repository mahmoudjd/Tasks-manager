import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model("Task", TaskSchema);
