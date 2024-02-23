import {FC} from "react";

interface BaseProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

interface InputProps extends BaseProps {
  type?: string;
}

interface TextAreaProps extends BaseProps {
  // Add any TextArea specific properties here
}

export const Lable = ({label}: {label: string}) => {
  return (
    <label className="block text-sm font-bold text-gray-100 mb-2">
      {label}
    </label>
  );
}

// InputField component
export const InputField: FC<InputProps> = ({ id, label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-3">
      <Lable label={label} />
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 py-2 px-2 block w-full bg-sky-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export const TextArea: FC<TextAreaProps> = ({ id, label, value, onChange, placeholder }) => {
  return (
    <div className="mb-3">
      <Lable label={label} />
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 py-2 px-2 block w-full bg-sky-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};
