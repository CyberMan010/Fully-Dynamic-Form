import React from 'react';
import './Input.css';


interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: () => void;
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
  onBlur,
  error,
}) => {
  return (
    <div className="input-group">
    {type === 'checkbox' ? (
// In the checkbox group div, add data-testid
<div className={`checkbox-group ${error ? 'invalid' : ''}`} data-testid="checkbox-group">   <input
      className="checkbox-input"
      type="checkbox"
      name={name}
      checked={value === 'true'}
      onChange={(e) => onChange?.({
        ...e,
        target: {
          ...e.target,
          name,
          value: String(e.target.checked)
        }
      })}
      onBlur={onBlur}
    />
        <label className="checkbox-label">{label}</label>
      </div>
    ) : type === 'select' ? (
        <select 
          className="input-field" 
          name={name} 
          value={value} 
          onChange={onChange}
          onBlur={onBlur}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="input-field"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;