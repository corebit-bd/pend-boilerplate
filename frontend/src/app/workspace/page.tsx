'use client';

import React, { useState } from 'react';
import { FileTree } from '@/components/workspace/FileTree';
import { CodeEditor } from '@/components/workspace/CodeEditor';
import { fetchFileContent } from '@/lib/api/workspace';

export default function WorkspacePage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleSelectFile = async (path: string) => {
    setSelectedPath(path);
    setIsLoadingFile(true);
    setFileError(null);

    try {
      const res = await fetchFileContent(path);
      setFileContent(res.content);
    } catch (err) {
      console.error(`Failed to load file content for ${path}:`, err);
      setFileError(err instanceof Error ? err.message : 'Failed to fetch file content');
      setFileContent('');
    } finally {
      setIsLoadingFile(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-lightmode-brightgray30-100 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar / Explorer Panel */}
      <aside className="w-64 border-r border-slate-800 bg-[#141414] flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto">
          <FileTree onSelectFile={handleSelectFile} selectedFilePath={selectedPath} />
        </div>
      </aside>

      {/* Main Content / Monaco Code Editor View */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-lightmode-brightgray30-100">
        {isLoadingFile && (
          <div className="h-9 border-b border-slate-800 bg-[#141414] flex items-center px-4 text-xs font-mono text-slate-500 animate-pulse">
            Loading file content...
          </div>
        )}

        {fileError && (
          <div className="m-4 text-xs text-red-400 bg-red-950/20 border border-red-900/50 p-3 rounded">
            {fileError}
          </div>
        )}

        {!isLoadingFile && !fileError && (
          <div className="flex-1 w-full h-full overflow-hidden">
            <CodeEditor
              filePath={selectedPath}
              content={fileContent}
              onChange={(val) => setFileContent(val || '')}
            />
          </div>
        )}
      </main>
    </div>
  );
}