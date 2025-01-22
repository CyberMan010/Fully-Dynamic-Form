import React from 'react';

interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
}) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return (
        <div>
          <label>{label}</label>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      );
    case 'select':
      return (
        <div>
          <label>{label}</label>
          <select name={name} value={value} onChange={onChange}>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
};

export default Input;