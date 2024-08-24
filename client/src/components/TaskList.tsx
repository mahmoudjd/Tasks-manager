import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  _id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onDelete,
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto bg-slate-50 rounded shadow p-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          name={task.name}
          id={task._id}
          createdAt={task.createdAt}
          completed={task.completed}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
