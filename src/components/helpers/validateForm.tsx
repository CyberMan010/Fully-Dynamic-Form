interface FormField {
    type: string;
    name: string;
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  }
  
  interface FormData {
    [key: string]: string | number;
  }
  
  interface Errors {
    [key: string]: string;
  }
  
  export const validateField = (field: FormField, value: string | number): string => {
    
    if (field.required && !value) {
      return `${field.label} is required`;
    }
  
    if (field.minLength && value && value.toString().length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters`;
    }
  
    if (field.maxLength && value && value.toString().length > field.maxLength) {
      return `${field.label} must be less than ${field.maxLength} characters`;
    }
  
    if (field.pattern && value && !new RegExp(field.pattern).test(value.toString())) {
      return `${field.label} is not valid`;
    }
  
    if (field.type === 'email' && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.toString())) {
      return `${field.label} is not a valid email address`;
    }
  
    if (field.type === 'number' && value && isNaN(Number(value))) {
      return `${field.label} must be a number`;
    }
    if (field.name === 'fullName') {
        const nameParts = value.toString().trim().split(' ');
        if (nameParts.length !== 3) {
          return 'Full name must have exactly three parts (First Middle Last)';
        }
        if (nameParts.some(part => part.length < 2)) {
          return 'Each name part must be at least 2 characters long';
        }
        if (!/^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/.test(value.toString())) {
          return 'Full name can only contain letters and spaces';
        }
      }
  
    return '';
  };
  
  export const validateForm = (formFields: FormField[], formData: FormData): Errors => {
    const errors: Errors = {};
  
    formFields.forEach(field => {
      const value = formData[field.name];
      const error = validateField(field, value);
      if (error) {
        errors[field.name] = error;
      }
    });
  
    return errors;
  };