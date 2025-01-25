import { validateField, validateForm } from './validateForm';

describe('validateField', () => {
  test('required field validation', () => {
    const field = {
      type: 'text',
      name: 'testField',
      label: 'Test Field',
      required: true
    };
    
    expect(validateField(field, '')).toBe('Test Field is required');
    expect(validateField(field, 'value')).toBe('');
  });

  test('full name validation', () => {
    const field = {
      type: 'text',
      name: 'fullName',
      label: 'Full Name',
      required: true
    };
    

    expect(validateField(field, 'John Doe')).toBe('Full name must have exactly three parts (First Middle Last)');
    expect(validateField(field, 'john Middle last')).toBe('Each name part must start with a capital letter followed by lowercase letters');
    expect(validateField(field, 'John Middle Last')).toBe('');
  });

  test('email validation', () => {
    const field = {
      type: 'email',
      name: 'email',
      label: 'Email',
      required: true
    };

    expect(validateField(field, 'invalid-email')).toBe('Please enter a valid email address');
    expect(validateField(field, 'test@example.com')).toBe('');
  });

  test('password validation', () => {
    const field = {
      type: 'password',
      name: 'password',
      label: 'Password',
      required: true
    };

    expect(validateField(field, 'short')).toBe('Password must be at least 8 characters long');
    expect(validateField(field, 'password123')).toBe('Password must include an uppercase letter');
    expect(validateField(field, 'Password123')).toBe('Password must include a special character (!@#$%^&*)');
    expect(validateField(field, 'Password123!')).toBe('');
  });
});

describe('validateForm', () => {
  test('validates multiple fields', () => {
    const formFields = [
      {
        type: 'text',
        name: 'fullName',
        label: 'Full Name',
        required: true
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true
      }
    ];

    const formData = {
      fullName: 'John',
      email: 'invalid-email'
    };

    const errors = validateForm(formFields, formData);
    
    expect(errors).toHaveProperty('fullName');
    expect(errors).toHaveProperty('email');
    expect(Object.keys(errors).length).toBe(2);
  });

  test('returns empty errors for valid data', () => {
    const formFields = [
      {
        type: 'text',
        name: 'fullName',
        label: 'Full Name',
        required: true
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true
      }
    ];

    const formData = {
      fullName: 'John Middle Last',
      email: 'test@example.com'
    };

    const errors = validateForm(formFields, formData);
    expect(Object.keys(errors).length).toBe(0);
  });
});