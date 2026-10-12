'use client';

import React from 'react';
import Editor, { BeforeMount } from '@monaco-editor/react';
import { FileIcon } from './FileIcon';
import { getLanguageFromPath, parseBreadcrumbs } from './editorUtils';

/**
 * Props for the {@link CodeEditor} component.
 */
export interface CodeEditorProps {
  /** The relative file path of the opened document */
  filePath: string | null;
  /** The text content of the opened document */
  content: string;
  /** Optional change callback when editor content is modified */
  onChange?: (value: string | undefined) => void;
  /** Whether the editor is in read-only mode */
  readOnly?: boolean;
}

/**
 * Renders a full Monaco Editor with language auto-detection, line numbers,
 * active line highlighting, and Cursor-style editor breadcrumbs.
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  filePath,
  content,
  onChange,
  readOnly = false,
}) => {
  if (!filePath) {
    return (
      <div className="w-full h-full bg-lightmode-brightgray30-100 flex items-center justify-center text-slate-500 text-xs font-sans">
        Select a file from the explorer to view its content
      </div>
    );
  }

  const filename = filePath.split('/').pop() || '';
  const breadcrumbs = parseBreadcrumbs(filePath);
  const language = getLanguageFromPath(filePath);

  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.editor.defineTheme('cursor-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#181818',
        'editor.lineHighlightBackground': '#222222',
        'editorLineNumber.foreground': '#4e4e4e',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editorGutter.background': '#181818',
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-lightmode-brightgray30-100 overflow-hidden" data-testid="code-editor">
      {/* Editor Tab & Breadcrumbs Header */}
      <div className="bg-[#141414] border-b border-slate-800 flex flex-col shrink-0">
        {/* Active File Tab */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-lightmode-brightgray30-100 border-t-2 border-indigo-500 text-xs text-slate-200 w-fit">
          <FileIcon filename={filename} />
          <span className="font-medium">{filename}</span>
        </div>

        {/* Breadcrumb Path Bar */}
        <div className="flex items-center gap-1 px-3 py-1 text-[11px] text-slate-400 bg-lightmode-brightgray30-100/60 border-t border-slate-800/40">
          {breadcrumbs.map((segment, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-slate-600">&gt;</span>}
              <span className={index === breadcrumbs.length - 1 ? 'text-slate-200 font-medium' : ''}>
                {segment}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Monaco Instance Container */}
      <div className="flex-1 w-full relative">
        <Editor
          height="100%"
          language={language}
          value={content}
          theme="cursor-dark"
          beforeMount={handleEditorWillMount}
          onChange={onChange}
          options={{
            readOnly,
            fontSize: 13,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 8, bottom: 8 },
            renderLineHighlight: 'all',
          }}
        />
      </div>
    </div>
  );
};