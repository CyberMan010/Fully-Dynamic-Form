import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
  const defaultProps = {
    type: 'text',
    name: 'testInput',
    label: 'Test Input',
    placeholder: 'Enter test value',
  };

  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders text input with label', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByTestId('input-testInput')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  test('handles text input change', async () => {
    render(<Input {...defaultProps} onChange={mockOnChange} />);
    const input = screen.getByTestId('input-testInput');
    
    await userEvent.type(input, 'test value');
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('handles blur event', () => {
    render(<Input {...defaultProps} onBlur={mockOnBlur} />);
    const input = screen.getByTestId('input-testInput');
    
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('displays error message when provided', () => {
    render(<Input {...defaultProps} error="Test error message" />);
    expect(screen.getByTestId('error-testInput')).toHaveTextContent('Test error message');
  });

  test('renders checkbox input correctly', () => {
    render(
      <Input 
        type="checkbox"
        name="testCheckbox"
        label="Test Checkbox"
      />
    );
    
    const checkbox = screen.getByTestId('checkbox-testCheckbox');
    expect(checkbox).toBeInTheDocument();
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  test('handles checkbox change', async () => {
    render(
      <Input 
        type="checkbox"
        name="testCheckbox"
        label="Test Checkbox"
        onChange={mockOnChange}
      />
    );
    
    const checkbox = screen.getByTestId('checkbox-testCheckbox');
    await userEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('renders select input with options', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(
      <Input 
        type="select"
        name="testSelect"
        label="Test Select"
        options={options}
      />
    );
    
    const select = screen.getByTestId('input-testSelect');
    expect(select).toBeInTheDocument();
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('handles select change', async () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    render(
      <Input 
        type="select"
        name="testSelect"
        label="Test Select"
        options={options}
        onChange={mockOnChange}
      />
    );
    
    const select = screen.getByTestId('input-testSelect');
    await userEvent.selectOptions(select, 'Option 2');
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('applies error class to checkbox group when error exists', () => {
    render(
      <Input 
        type="checkbox"
        name="testCheckbox"
        label="Test Checkbox"
        error="Test error"
      />
    );
    
    const checkboxGroup = screen.getByTestId('input-testCheckbox');
    expect(checkboxGroup).toHaveClass('invalid');
  });

  test('maintains value in controlled input', () => {
    const testValue = 'test value';
    render(
      <Input 
        {...defaultProps}
        value={testValue}
      />
    );
    
    const input = screen.getByTestId('input-testInput');
    expect(input).toHaveValue(testValue);
  });
});