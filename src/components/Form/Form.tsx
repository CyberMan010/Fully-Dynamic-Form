import React, { useState, useEffect } from 'react';
import Input from '../input';
import formConfig from '../config/config.json';
import { Button } from 'digitinary-ui';
import { validateForm, validateField } from '../helpers/validateForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Form.css';

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
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validation = validateForm(formFields, formData);
    setErrors(validation);
    setIsFormValid(Object.keys(validation).length === 0);
  }, [formData, formFields]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    const field = formFields.find(f => f.name === name);
    if (field) {
      const fieldError = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid) {
      toast.success('Form submitted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log('Form submitted:', formData);
    } else {
      toast.error('Please fix the errors in the form', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const getFieldClassName = (fieldName: string) => {
    const baseClass = 'form-group';
    if (!touched[fieldName]) return baseClass;
    return `${baseClass} ${errors[fieldName] ? 'invalid' : 'valid'}`;
  };

  return (
    <>
    
    <form className="dynamic-form" onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div className={getFieldClassName(field.name)} key={field.name}>
          <Input
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            options={field.options}
            value={formData[field.name] || ''}
            onChange={handleChange}
            onBlur={() => handleBlur(field.name)}
            error={touched[field.name] ? errors[field.name] : ''}
          />
        </div>
      ))}
      <Button type="submit" disabled={!isFormValid}>
        Submit
      </Button>
    </form>
     <ToastContainer />
    </>
  );
};

export default DynamicForm;