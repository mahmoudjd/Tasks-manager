import React from "react";
import MyInput from "./MyInput";

interface Props {
  value: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
}

const AddTask: React.FC<Props> = ({ value, setValue, onSubmit }) => {
  return (
    <div className="w-full max-w-2xl mx-auto m-2 border rounded p-4 flex flex-col gap-2 items-center">
      <MyInput
        placeholder="add the new task hier..."
        type="text"
        value={value}
        setValue={setValue}
      />
      <button
        onClick={onSubmit}
        className="w-48 rounded bg-blue-500 px-2 py-4 text-white font-semibold my-2 hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
