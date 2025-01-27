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
    // Required field validation
    if (field.required && !value) {
      return `${field.label} is required`;
    }
  
    // Full Name validation
    if (field.name === 'fullName') {
      const nameValue = value.toString().trim();
      const nameParts = nameValue.split(' ').filter(part => part.length > 0).map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());

    
      if (nameParts.length !== 3) {
        return 'Full name must have exactly three parts (First Middle Last)';
      }
    
      if (nameParts.some(part => part.length < 2 || part.length > 20)) {
        return 'Each name part must be between 2-20 characters';
      }
      const transformedName = nameParts.join(' ');

      if (!/^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/.test(transformedName)) {
        return 'Each name part must start with a capital letter followed by lowercase letters';
      }
    }
  
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(value.toString())) {
        return 'Please enter a valid email address';
      }
    }
  
    // Password validation
    if (field.type === 'password' && value) {
      const password = value.toString();
      if (password.length < 8) return 'Password must be at least 8 characters long';
      if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter';
      if (!/[a-z]/.test(password)) return 'Password must include a lowercase letter';
      if (!/[0-9]/.test(password)) return 'Password must include a number';
      if (!/[!@#$%^&*]/.test(password)) return 'Password must include a special character (!@#$%^&*)';
    }
  
    // Age validation
    if (field.name === 'age' && value) {
      const age = Number(value);
      if (isNaN(age) || age < 18 || age > 120) {
        return 'Age must be between 18 and 120';
      }
    }
  
    // Phone number validation
  // Phone number validation
if (field.name === 'phone' && value) {
  if (!/^\+?[0-9]{9,15}$/.test(value.toString())) {
    return 'Please enter a valid phone number (9-15 digits)';
  }
}
  
    // Checkbox validation
    if (field.type === 'checkbox' && field.required) {
      if (value !== 'true') {
        return `Please accept the ${field.label.toLowerCase()}`;
      }
    }
  
    // Length validations
    if (field.minLength && value && value.toString().length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters`;
    }
  
    if (field.maxLength && value && value.toString().length > field.maxLength) {
      return `${field.label} must be less than ${field.maxLength} characters`;
    }
  
    // Pattern validation
    if (field.pattern && value && !new RegExp(field.pattern).test(value.toString())) {
      return `${field.label} format is not valid`;
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