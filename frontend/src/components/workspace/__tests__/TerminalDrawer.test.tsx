import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TerminalDrawer } from '../TerminalDrawer';

describe('TerminalDrawer Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onTabChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<TerminalDrawer {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders terminal drawer container when isOpen is true', () => {
    render(<TerminalDrawer {...defaultProps} />);
    expect(screen.getByTestId('terminal-drawer')).toBeInTheDocument();
  });

  it('renders all tab navigation buttons', () => {
    render(<TerminalDrawer {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Problems/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Output/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Debug Console/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Terminal/i })).toBeInTheDocument();
  });

  it('renders default prompt with default project name under Terminal tab', () => {
    render(<TerminalDrawer {...defaultProps} />);
    expect(screen.getByText(/jeetzhkhondker@CoreBit pend-boilerplate %/i)).toBeInTheDocument();
  });

  it('renders custom project name in prompt when projectName prop is provided', () => {
    render(<TerminalDrawer {...defaultProps} projectName="medicore" />);
    expect(screen.getByText(/jeetzhkhondker@CoreBit medicore %/i)).toBeInTheDocument();
  });

  it('switches tabs and calls onTabChange callback when tab is clicked', () => {
    render(<TerminalDrawer {...defaultProps} />);

    const outputTab = screen.getByRole('button', { name: /Output/i });
    fireEvent.click(outputTab);

    expect(defaultProps.onTabChange).toHaveBeenCalledWith('output');
    expect(screen.getByText(/Workspace task runner output initialized/i)).toBeInTheDocument();

    const problemsTab = screen.getByRole('button', { name: /Problems/i });
    fireEvent.click(problemsTab);

    expect(defaultProps.onTabChange).toHaveBeenCalledWith('problems');
    expect(screen.getByText(/No problems have been detected/i)).toBeInTheDocument();

    const debugTab = screen.getByRole('button', { name: /Debug Console/i });
    fireEvent.click(debugTab);

    expect(defaultProps.onTabChange).toHaveBeenCalledWith('debug');
    expect(screen.getByText(/No active debug sessions running/i)).toBeInTheDocument();
  });

  it('allows changing the selected shell environment', () => {
    render(<TerminalDrawer {...defaultProps} />);
    const select = screen.getByRole('combobox', { name: /Select Shell Environment/i });

    expect(select).toHaveValue('zsh');
    fireEvent.change(select, { target: { value: 'Python backend' } });
    expect(select).toHaveValue('Python backend');
  });

  it('calls onClose when close button is clicked', () => {
    render(<TerminalDrawer {...defaultProps} />);
    const closeBtn = screen.getByTitle(/Close Terminal/i);

    fireEvent.click(closeBtn);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });
});