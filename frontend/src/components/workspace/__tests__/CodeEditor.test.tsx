import React from 'react';
import { render, screen } from '@testing-library/react';
import { CodeEditor } from '../CodeEditor';
import { getLanguageFromPath, parseBreadcrumbs } from '../editorUtils';

// Mock Monaco Editor component for Jest unit testing environment
jest.mock('@monaco-editor/react', () => {
    return function DummyMonacoEditor(props: { language?: string; value?: string }) {
      return (
        <div data-testid="monaco-instance" data-language={props.language}>
          {props.value}
        </div>
      );
    };
});

describe('editorUtils', () => {
  describe('getLanguageFromPath', () => {
    it('resolves python for .py files', () => {
      expect(getLanguageFromPath('backend/manage.py')).toBe('python');
    });

    it('resolves typescript for .ts and .tsx files', () => {
      expect(getLanguageFromPath('frontend/src/App.tsx')).toBe('typescript');
      expect(getLanguageFromPath('lib/utils.ts')).toBe('typescript');
    });

    it('resolves javascript for .js and .jsx files', () => {
      expect(getLanguageFromPath('index.js')).toBe('javascript');
    });

    it('resolves yaml for .yaml and .yml files', () => {
      expect(getLanguageFromPath('docker-compose.yml')).toBe('yaml');
      expect(getLanguageFromPath('config.yaml')).toBe('yaml');
    });

    it('resolves sql for .sql files', () => {
      expect(getLanguageFromPath('database/schema.sql')).toBe('sql');
    });

    it('resolves json for .json files', () => {
      expect(getLanguageFromPath('package.json')).toBe('json');
    });

    it('resolves dockerfile and env files', () => {
      expect(getLanguageFromPath('Dockerfile')).toBe('dockerfile');
      expect(getLanguageFromPath('.env.local')).toBe('ini');
    });

    it('falls back to plaintext for unknown extensions', () => {
      expect(getLanguageFromPath('notes.unknown')).toBe('plaintext');
      expect(getLanguageFromPath('')).toBe('plaintext');
    });
  });

  describe('parseBreadcrumbs', () => {
    it('splits relative file path into breadcrumb array', () => {
      expect(parseBreadcrumbs('backend/mcp_server/routes/llm.py')).toEqual([
        'backend',
        'mcp_server',
        'routes',
        'llm.py',
      ]);
    });

    it('returns empty array for empty path', () => {
      expect(parseBreadcrumbs('')).toEqual([]);
    });
  });
});

describe('CodeEditor Component', () => {
  it('renders unselected fallback prompt when filePath is null', () => {
    render(<CodeEditor filePath={null} content="" />);
    expect(
      screen.getByText(/Select a file from the explorer to view its content/i)
    ).toBeInTheDocument();
  });

  it('renders breadcrumbs and file tab correctly when filePath is provided', () => {
    render(
      <CodeEditor
        filePath="backend/mcp_server/routes/llm.py"
        content="import os\nimport sys"
      />
    );

    // Assert both the Tab label and Breadcrumb item exist
    const filenameElements = screen.getAllByText('llm.py');
    expect(filenameElements).toHaveLength(2);

    expect(screen.getByText('backend')).toBeInTheDocument();
    expect(screen.getByText('mcp_server')).toBeInTheDocument();
    expect(screen.getByText('routes')).toBeInTheDocument();

    const monacoInstance = screen.getByTestId('monaco-instance');
    expect(monacoInstance).toBeInTheDocument();
    expect(monacoInstance).toHaveAttribute('data-language', 'python');
  });
});