import React from "react";

interface TaskProps {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  completed: boolean;
  onStatusChange: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({
  id,
  name,
  content,
  createdAt,
  updatedAt,
  completed,
  onStatusChange,
  onDelete,
}: TaskProps) => {
  return (
    <div className="w-full flex flex-col gap-2 items-flexstart bg-white m-2 p-4 rounded shadow ">
      <h4
        className={`text-lg font-semibold text-gray-800 ${completed ? "line-through" : ""}`}
      >
        {name}
      </h4>
      <p
        className={`text-sm rounded p-4 ${completed ? "bg-green-500 text-white line-through" : "bg-slate-100 text-gray-700"}`}
      >
        {content}
      </p>
      <p>
        <label className="text-gray-700">task is complete: </label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onStatusChange(id, !completed)}
          className="w-4 h-4 hover:cursor-pointer transition-colors"
        />
      </p>
      {updatedAt ? (
        <p className="text-gray-700 text-sm">
          Updated at: {new Date(createdAt).toLocaleString()}
        </p>
      ) : (
        <p className="text-gray-700 text-sm">
          Created at: {new Date(createdAt).toLocaleString()}
        </p>
      )}
      <div className="flex flex-row items-center justify-evenly gap-4">
        <button
          onClick={() => onDelete(id)}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded "
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default TaskItem;
