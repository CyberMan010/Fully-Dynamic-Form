import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import DynamicForm from './Form';


// Mock dependencies
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(() => null),
}));

jest.mock('../config/config.json', () => ([
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
  },
  {
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true
  }
]));

describe('DynamicForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields from config', () => {
    render(<DynamicForm />);
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('validates fields on blur', async () => {
    render(<DynamicForm />);
    const fullNameInput = screen.getByLabelText('Full Name');
    
    await userEvent.type(fullNameInput, 'John');
    fireEvent.blur(fullNameInput);
    
    expect(await screen.findByText('Full name must have exactly three parts (First Middle Last)')).toBeInTheDocument();
  });

  test('updates form data on input change', async () => {
    render(<DynamicForm />);
    const emailInput = screen.getByLabelText('Email');
    
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('submit button is disabled when form is invalid', () => {
    render(<DynamicForm />);
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  test('shows success toast on valid form submission', async () => {
    render(<DynamicForm />);
    
    await userEvent.type(screen.getByLabelText('Full Name'), 'John Middle Last');
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'Password123!');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeEnabled();
    
    await userEvent.click(submitButton);
    expect(toast.success).toHaveBeenCalledWith(
      'Form submitted successfully!',
      expect.any(Object)
    );
  });

  test('shows error toast on invalid form submission', async () => {
    render(<DynamicForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith(
      'Please fix the errors in the form',
      expect.any(Object)
    );
  });

  test('applies correct validation classes', async () => {
    render(<DynamicForm />);
    const emailInput = screen.getByLabelText('Email');
    
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    
    expect(emailInput.closest('.form-group')).toHaveClass('invalid');
    
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'valid@email.com');
    fireEvent.blur(emailInput);
    
    expect(emailInput.closest('.form-group')).toHaveClass('valid');
  });

  test('handles form reset', async () => {
    render(<DynamicForm />);
    
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    await userEvent.type(emailInput, 'test@example.com');
    
    fireEvent.reset(screen.getByRole('form'));
    expect(emailInput.value).toBe('');
  });
});