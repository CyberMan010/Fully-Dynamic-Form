import { validateForm } from "../helpers/validateForm";

describe('validateForm', () => {
  const formFields = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      required: true,
    },
    {
      type: 'number',
      name: 'age',
      label: 'Age',
      required: false,
    },
  ];

  it('should return errors for required fields', () => {
    const formData = {
      firstName: '',
      email: '',
      age: '',
    };
    const errors = validateForm(formFields, formData);
    expect(errors.firstName).toBe('First Name is required.');
    expect(errors.email).toBe('Email is required.');
  });

  it('should validate email format', () => {
    const formData = {
      firstName: 'John',
      email: 'invalid-email',
      age: '25',
    };
    const errors = validateForm(formFields, formData);
    expect(errors.email).toBe('Invalid email format.');
  });

  it('should validate number fields', () => {
    const formData = {
      firstName: 'John',
      email: 'john@example.com',
      age: 'not-a-number',
    };
    const errors = validateForm(formFields, formData);
    expect(errors.age).toBe('Age must be a valid number.');
  });

  it('should return no errors for valid data', () => {
    const formData = {
      firstName: 'John',
      email: 'john@example.com',
      age: '25',
    };
    const errors = validateForm(formFields, formData);
    expect(Object.keys(errors).length).toBe(0);
  });
});