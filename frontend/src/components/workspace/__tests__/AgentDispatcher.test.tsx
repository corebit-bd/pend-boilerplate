import { render, screen, fireEvent } from '@testing-library/react';
import { AgentDispatcher } from '../AgentDispatcher';

describe('AgentDispatcher Component', () => {
  it('submits user input correctly', () => {
    const handleDispatch = jest.fn();
    render(<AgentDispatcher onDispatch={handleDispatch} />);

    fireEvent.change(screen.getByPlaceholderText('Enter agent task prompt...'), {
      target: { value: 'Create schema' },
    });
    fireEvent.click(screen.getByText('Dispatch'));

    expect(handleDispatch).toHaveBeenCalledWith('Create schema', '');
  });
});