import React, { useState, useEffect } from 'react';
import Input from '../input/Input';
import formConfig from '../config/config.json'; 
import { Button } from "digitinary-ui";

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

const DynamicForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>(formConfig);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <Input
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options}
          value={formData[field.name] || ''}
          onChange={handleChange}
        />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DynamicForm;