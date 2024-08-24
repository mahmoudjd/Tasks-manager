interface Props {
  type: string;
  placeholder: string;
  value: string;
  setValue: (input: string) => void;
}

const InputComponent = ({ type, placeholder, value, setValue }: Props) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
      className="w-full border-none shadow bg-slate-50 rounded px-2 py-4 text-lg"
    />
  );
};

export default InputComponent;
