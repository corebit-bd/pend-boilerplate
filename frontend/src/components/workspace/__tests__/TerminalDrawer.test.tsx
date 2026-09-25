import { render, screen, fireEvent } from '@testing-library/react';
import { TerminalDrawer } from '../TerminalDrawer';

describe('TerminalDrawer Component', () => {
  it('renders log lines and handles command submission', () => {
    const handleRun = jest.fn();
    render(<TerminalDrawer logs={['Hello Terminal\n']} onRunCommand={handleRun} />);

    expect(screen.getByText(/Hello Terminal/)).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Execute Shell Command/i);
    fireEvent.change(input, { target: { value: 'ls -la' } });
    fireEvent.click(screen.getByText('Run'));

    expect(handleRun).toHaveBeenCalledWith('ls -la');
  });
});