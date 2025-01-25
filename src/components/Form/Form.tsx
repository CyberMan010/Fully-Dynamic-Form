import React, { useState } from 'react';
import Input from '../input';
import formConfig from '../config/config.json';
import { Button } from 'digitinary-ui';
import { validateForm, validateField } from '../helpers/validateForm';

interface FormField {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

const DynamicForm: React.FC = () => {
  const [formFields] = useState<FormField[]>(formConfig);
  const [formData, setFormData] = useState<Record<string, string | number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const field = formFields.find(f => f.name === name);
    if (field) {
      const error = validateField(field, value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateForm(formFields, formData);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      console.log('Form Data:', formData);
      // Add your form submission logic here (e.g., API call)
    } else {
      console.log('Validation errors:', validation);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name}>
          <Input
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            options={field.options}
            value={formData[field.name] || ''}
            onChange={handleChange}
            error={errors[field.name]}
          />
          {errors[field.name] && <span style={{ color: 'red' }}>{errors[field.name]}</span>}
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default DynamicForm;