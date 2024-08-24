import React from "react";
import FilterButton from "./FilterButton";

interface TaskFilterProps {
  onFilter: (completed?: boolean) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilter }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-wrap gap-2 items-center justify-center p-4 mb-4 border rounded">
      <FilterButton title="All Taskts" onFilter={() => onFilter()} />
      <FilterButton title="Completed" onFilter={() => onFilter(true)} />
      <FilterButton title="Not Completed" onFilter={() => onFilter(false)} />
    </div>
  );
};

export default TaskFilter;
