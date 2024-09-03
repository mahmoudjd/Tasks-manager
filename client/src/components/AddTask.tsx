import React from "react";
import MyInput from "./MyInput";

interface Props {
  name: string;
  setName: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  onSubmit: () => void;
}

const AddTask: React.FC<Props> = ({
  name,
  content,
  setName,
  setContent,
  onSubmit,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto m-2 border rounded p-4 flex flex-col gap-2 items-center">
      <MyInput
        placeholder="Enter the title of task hier..."
        type="text"
        value={name}
        setValue={setName}
      />

      <MyInput
        placeholder="Enter the content of task hier..."
        type="text"
        value={content}
        setValue={setContent}
      />
      <button
        onClick={onSubmit}
        className="w-48 rounded bg-blue-500 px-2 py-4 text-white font-semibold hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
