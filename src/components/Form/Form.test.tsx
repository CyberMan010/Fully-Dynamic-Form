import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicForm from './Form';

const onSubmit = jest.fn();

beforeEach(() => {
  render(<DynamicForm onSubmit={onSubmit} />);
});

afterEach(() => {
    onSubmit.mockReset();
});

test('should show a form with valid input', () => {
    expect(screen.getByRole)
});