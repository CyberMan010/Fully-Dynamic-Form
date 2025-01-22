interface FormField {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
  }
  
  interface FormData {
    [key: string]: string | number;
  }
  
  interface ValidationErrors {
    [key: string]: string;
  }
  
  export const validateForm = (formFields: FormField[], formData: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    formFields.forEach((field) => {
      const value = formData[field.name];
  
      // Check for required fields
      if (field.required && !value) {
        errors[field.name] = `${field.label} is required.`;
      }
  
      // Validate email format
      if (field.type === 'email' && value && typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field.name] = 'Invalid email format.';
        }
      }
  
      // Validate number fields
      if (field.type === 'number' && value && typeof value === 'string') {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) {
          errors[field.name] = `${field.label} must be a valid number.`;
        }
      }
  
    });
  
    return errors;
  };