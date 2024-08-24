import React from "react";

interface TaskProps {
  id: string;
  name: string;
  createdAt: Date;
  completed: boolean;
  onStatusChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({
  id,
  name,
  createdAt,
  completed,
  onStatusChange,
  onDelete,
}: TaskProps) => {
  return (
    <div className="w-full text-gray-800 flex flex-col gap-2 items-flexstart bg-white m-2 p-4 rounded shadow ">
      <h4
        className={`text-lg font-semibold text-gray-800 ${completed ? "line-through" : ""}`}
      >
        {name}
      </h4>
      <p>
        <label className="text-gray-700">task is complete: </label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onStatusChange(id, !completed)}
          className="w-4 h-4 hover:cursor-pointer transition-colors"
        />
      </p>
      <p className="text-gray-700 text-sm">
        Created at: {new Date(createdAt).toLocaleDateString()}
      </p>
      <button
        onClick={() => onDelete(id)}
        className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded "
      >
        X
      </button>
    </div>
  );
};
export default TaskItem;
