import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from './Form';
import { ToastContainer, toast } from 'react-toastify';

// Mock Input component to avoid onChange warnings
jest.mock('../input', () => ({
  __esModule: true,
  default: ({ label, onChange = () => {}, ...props }: any) => (
    <div>
      <label>{label}</label>
      <input onChange={onChange} {...props} />
    </div>
  ),
}));

// Mock Button component
jest.mock('digitinary-ui', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock validation to control form validity
jest.mock('../helpers/validateForm', () => ({
  validateForm: jest.fn(() => ({})),
  validateField: jest.fn(() => ''),
}));

jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe('DynamicForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields', () => {
    render(<DynamicForm />);
    expect(screen.getByTestId('dynamic-form')).toBeInTheDocument();
  });

  test('submits form successfully', () => {
    render(
      <>
        <DynamicForm />
        <ToastContainer />
      </>
    );

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(toast.success).toHaveBeenCalledWith("Form submitted successfully!");
  });
});
