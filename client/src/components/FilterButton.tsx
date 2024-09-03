import React from "react";

interface FilterButtonProps {
  title: string;
  onFilter: () => void;
}

const FilterButton = ({ title, onFilter }: FilterButtonProps) => {
  return (
    <button
      onClick={onFilter}
      className="bg-gray-500 hover:bg-gray-600 p-4 text-white rounded w-40"
    >
      {title}
    </button>
  );
};

export default FilterButton;
