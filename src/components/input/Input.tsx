import React from 'react';

interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string; 
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <div>
      <label>{label}</label>
      {type === 'select' ? (
        <select name={name} value={value} onChange={onChange}>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
};

export default Input;