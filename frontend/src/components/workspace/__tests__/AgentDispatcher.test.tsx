import { render, screen, fireEvent } from '@testing-library/react';
import { AgentDispatcher } from '../AgentDispatcher';

describe('AgentDispatcher Component', () => {
  it('submits user input correctly with empty target file', () => {
    const handleDispatch = jest.fn();
    render(<AgentDispatcher onDispatch={handleDispatch} />);

    fireEvent.change(screen.getByPlaceholderText('Enter agent task prompt...'), {
      target: { value: 'Create schema' },
    });
    fireEvent.click(screen.getByText('Dispatch'));

    expect(handleDispatch).toHaveBeenCalledWith('Create schema', '');
  });

  it('pre-populates target file from props correctly', () => {
    const handleDispatch = jest.fn();
    render(<AgentDispatcher onDispatch={handleDispatch} targetFile="README.md" />);

    const targetInput = screen.getByPlaceholderText('Target file path (optional)') as HTMLInputElement;
    expect(targetInput.value).toBe('README.md');

    fireEvent.change(screen.getByPlaceholderText('Enter agent task prompt...'), {
      target: { value: 'Update documentation' },
    });
    fireEvent.click(screen.getByText('Dispatch'));

    expect(handleDispatch).toHaveBeenCalledWith('Update documentation', 'README.md');
  });

  it('allows user to override pre-populated target file', () => {
    const handleDispatch = jest.fn();
    render(<AgentDispatcher onDispatch={handleDispatch} targetFile="README.md" />);

    const targetInput = screen.getByPlaceholderText('Target file path (optional)');
    fireEvent.change(targetInput, { target: { value: 'src/app.tsx' } });

    fireEvent.change(screen.getByPlaceholderText('Enter agent task prompt...'), {
      target: { value: 'Fix bug' },
    });
    fireEvent.click(screen.getByText('Dispatch'));

    expect(handleDispatch).toHaveBeenCalledWith('Fix bug', 'src/app.tsx');
  });
});