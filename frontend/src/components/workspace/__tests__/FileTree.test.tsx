import { render, screen } from '@testing-library/react';
import { FileTree } from '../FileTree';
import { FileNode } from '@/types/workspace';

describe('FileTree Component', () => {
  const mockTree: FileNode = {
    name: 'src',
    type: 'directory',
    children: [{ name: 'index.ts', type: 'file' }],
  };

  it('renders directory and child file nodes correctly', () => {
    render(<FileTree node={mockTree} />);
    expect(screen.getByText('src')).toBeInTheDocument();
    expect(screen.getByText('index.ts')).toBeInTheDocument();
  });
});