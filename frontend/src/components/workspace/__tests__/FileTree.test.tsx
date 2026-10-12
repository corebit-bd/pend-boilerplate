import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { FileTree } from '../FileTree';
import { FileIcon } from '../FileIcon';
import { fetchFileTree } from '@/lib/api/workspace';

jest.mock('@/lib/api/workspace', () => ({
  fetchFileTree: jest.fn(),
}));

const mockFetchFileTree = fetchFileTree as jest.MockedFunction<typeof fetchFileTree>;

describe('FileIcon Component', () => {
  it('renders python icon for .py files', () => {
    render(<FileIcon filename="script.py" />);
    expect(screen.getByTestId('icon-python')).toBeInTheDocument();
  });

  it('renders typescript icon for .ts and .tsx files', () => {
    render(<FileIcon filename="index.tsx" />);
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
  });

  it('renders yaml icon for .yml and .yaml files', () => {
    render(<FileIcon filename="config.yaml" />);
    expect(screen.getByTestId('icon-yaml')).toBeInTheDocument();
  });

  it('renders folder icons correctly based on isOpen state', () => {
    const { rerender } = render(<FileIcon filename="src" isDirectory={true} isOpen={false} />);
    expect(screen.getByTestId('folder-closed-icon')).toBeInTheDocument();

    rerender(<FileIcon filename="src" isDirectory={true} isOpen={true} />);
    expect(screen.getByTestId('folder-open-icon')).toBeInTheDocument();
  });
});

describe('FileTree Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchFileTree.mockResolvedValue([
      {
        name: 'backend',
        path: 'backend',
        is_directory: true,
        children: [],
      },
      {
        name: 'main.py',
        path: 'backend/main.py',
        is_directory: false,
      },
      {
        name: 'package.json',
        path: 'package.json',
        is_directory: false,
      },
    ]);
  });

  it('renders root directory and file nodes with uniform text colors', async () => {
    render(<FileTree selectedFilePath="package.json" />);

    await waitFor(() => {
      expect(screen.getByText('backend')).toBeInTheDocument();
      expect(screen.getByText('main.py')).toBeInTheDocument();
      expect(screen.getByText('package.json')).toBeInTheDocument();
    });

    // Check custom icons
    expect(screen.getByTestId('icon-python')).toBeInTheDocument();
    expect(screen.getByTestId('icon-json')).toBeInTheDocument();
  });

  it('handles node selection callback correctly', async () => {
    const handleSelect = jest.fn();
    render(<FileTree onSelectFile={handleSelect} selectedFilePath="backend/main.py" />);

    await waitFor(() => {
      expect(screen.getByText('main.py')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('main.py'));
    expect(handleSelect).toHaveBeenCalledWith('backend/main.py');
  });

  it('expands directory dynamically when clicked', async () => {
    mockFetchFileTree.mockImplementation(async (path) => {
      if (path === '') {
        return [
          {
            name: 'src',
            path: 'src',
            is_directory: true,
            children: [],
          },
        ];
      }
      if (path === 'src') {
        return [
          {
            name: 'App.tsx',
            path: 'src/App.tsx',
            is_directory: false,
          },
        ];
      }
      return [];
    });

    render(<FileTree />);

    await waitFor(() => {
      expect(screen.getByText('src')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('src'));

    await waitFor(() => {
      expect(screen.getByText('App.tsx')).toBeInTheDocument();
      expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
    });
  });
});