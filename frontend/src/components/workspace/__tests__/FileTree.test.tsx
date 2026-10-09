import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { FileTree } from '../FileTree';

// Mock the workspace API helper
jest.mock('@/lib/api/workspace', () => ({
  fetchFileTree: jest.fn().mockResolvedValue([
    {
      name: 'src',
      path: 'src',
      is_directory: true,
      children: [],
    },
    {
      name: 'package.json',
      path: 'package.json',
      is_directory: false,
    },
  ]),
}));

describe('FileTree Component', () => {
  it('renders root nodes fetched from API', async () => {
    render(<FileTree selectedFilePath="package.json" />);

    await waitFor(() => {
      expect(screen.getByText('src')).toBeInTheDocument();
      expect(screen.getByText('package.json')).toBeInTheDocument();
    });
  });
});