import React, { useState, useEffect } from 'react';
import Input from '../input/Input';

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

const DynamicForm: React.FC = () => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  useEffect(() => {
    // Load the JSON file dynamically
    fetch('/path/to/formConfig.json')
      .then((response) => response.json())
      .then((data: FormField[]) => setFormFields(data))
      .catch((error) => console.error('Error loading form config:', error));
  }, []);

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
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;