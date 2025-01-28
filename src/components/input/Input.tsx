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
  const inputId = `${name}-input`;

  if (type === 'checkbox') {
    return (
      <div className="input-group">
        <div 
          className={`checkbox-group ${error ? 'invalid' : ''}`} 
          data-testid={`input-${name}`}
        >
          <input
            id={inputId}
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
            data-testid={`checkbox-${name}`}
          />
          <label className="checkbox-label" htmlFor={inputId}>{label}</label>
        </div>
        {error && <span className="error-message" data-testid={`error-${name}`}>{error}</span>}
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="input-group">
        <label htmlFor={inputId}>{label}</label>
        <select 
          id={inputId}
          className="input-field" 
          name={name} 
          value={value} 
          onChange={onChange}
          onBlur={onBlur}
          data-testid={`input-${name}`}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <span className="error-message" data-testid={`error-${name}`}>{error}</span>}
      </div>
    );
  }

  return (
    <div className="input-group">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className="input-field"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        data-testid={`input-${name}`}
      />
      {error && <span className="error-message" data-testid={`error-${name}`}>{error}</span>}
    </div>
  );
};

export default Input;