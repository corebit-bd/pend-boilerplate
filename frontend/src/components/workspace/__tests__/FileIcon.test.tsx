import { render, screen } from '@testing-library/react';
import { FileIcon } from '../FileIcon';

describe('FileIcon Component', () => {
  it('renders Python icon for .py files', () => {
    render(<FileIcon filename="main.py" />);
    expect(screen.getByTestId('icon-python')).toBeInTheDocument();
  });

  it('renders TypeScript icon for .ts and .tsx files', () => {
    const { rerender } = render(<FileIcon filename="index.ts" />);
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();

    rerender(<FileIcon filename="App.tsx" />);
    expect(screen.getByTestId('icon-typescript')).toBeInTheDocument();
  });

  it('renders JavaScript icon for .js and .jsx files', () => {
    const { rerender } = render(<FileIcon filename="script.js" />);
    expect(screen.getByTestId('icon-javascript')).toBeInTheDocument();

    rerender(<FileIcon filename="Component.jsx" />);
    expect(screen.getByTestId('icon-javascript')).toBeInTheDocument();
  });

  it('renders Markdown icon for .md and .mdx files', () => {
    render(<FileIcon filename="README.md" />);
    expect(screen.getByTestId('icon-markdown')).toBeInTheDocument();
  });

  it('renders YAML icon for .yml and .yaml files', () => {
    render(<FileIcon filename="config.yaml" />);
    expect(screen.getByTestId('icon-yaml')).toBeInTheDocument();
  });

  it('renders JSON icon for .json files', () => {
    render(<FileIcon filename="package.json" />);
    expect(screen.getByTestId('icon-json')).toBeInTheDocument();
  });

  it('renders Environment icon for .env files', () => {
    render(<FileIcon filename=".env.local" />);
    expect(screen.getByTestId('icon-env')).toBeInTheDocument();
  });

  it('renders Git icon for git-related files', () => {
    render(<FileIcon filename=".gitignore" />);
    expect(screen.getByTestId('icon-git')).toBeInTheDocument();
  });

  it('renders Docker icon for docker-related files', () => {
    render(<FileIcon filename="Dockerfile" />);
    expect(screen.getByTestId('icon-docker')).toBeInTheDocument();
  });

  it('renders SQL icon for .sql files', () => {
    render(<FileIcon filename="schema.sql" />);
    expect(screen.getByTestId('icon-sql')).toBeInTheDocument();
  });

  it('renders default file icon for unknown extensions', () => {
    render(<FileIcon filename="data.unknown" />);
    expect(screen.getByTestId('icon-default')).toBeInTheDocument();
  });

  it('renders directory open/closed folder icons correctly', () => {
    const { rerender } = render(<FileIcon filename="src" isDirectory={true} isOpen={false} />);
    expect(screen.getByTestId('folder-closed-icon')).toBeInTheDocument();

    rerender(<FileIcon filename="src" isDirectory={true} isOpen={true} />);
    expect(screen.getByTestId('folder-open-icon')).toBeInTheDocument();
  });
});