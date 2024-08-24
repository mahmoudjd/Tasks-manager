import React from "react";

interface Props {
  type: "button" | "submit" | "reset"; // Korrektur: "type" hat nur diese drei erlaubten Werte
  name: string;
  handleClick: () => void;
}

const MyButton = ({ type, name, handleClick }: Props) => {
  return (
    <button
      type={type}
      className="w-full border-none shadow bg-blue-500 rounded p-4 hover:bg-blue-600 text-white text-lg font-semibold"
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default MyButton;
