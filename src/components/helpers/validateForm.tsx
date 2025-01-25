export const validateForm = (formFields, formData) => {
    const errors = {};
    formFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
      // Add more validation logic as needed
    });
    return errors;
  };