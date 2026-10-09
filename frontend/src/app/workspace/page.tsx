'use client';

import React, { useState } from 'react';
import { FileTree } from '@/components/workspace/FileTree';
import { fetchFileContent } from '@/lib/api/workspace';

export default function WorkspacePage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
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
      setFileContent(null);
    } finally {
      setIsLoadingFile(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar / Explorer Panel */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="px-4 py-3 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Explorer
        </div>
        <div className="flex-1 overflow-y-auto">
          <FileTree onSelectFile={handleSelectFile} selectedFilePath={selectedPath} />
        </div>
      </aside>

      {/* Main Content / Editor View */}
      <main className="flex-1 flex flex-col bg-slate-950">
        {/* Active Tab Bar */}
        <div className="h-9 border-b border-slate-800 bg-slate-900/30 flex items-center px-4 text-xs font-mono text-slate-400">
          {selectedPath ? (
            <span className="text-indigo-400 font-medium">{selectedPath}</span>
          ) : (
            <span className="text-slate-600">No file selected</span>
          )}
        </div>

        {/* Code / Content Viewer Area */}
        <div className="flex-1 p-4 overflow-auto font-mono text-xs">
          {isLoadingFile && (
            <div className="text-slate-500 animate-pulse">Loading file content...</div>
          )}

          {fileError && (
            <div className="text-red-400 bg-red-950/20 border border-red-900/50 p-3 rounded">
              {fileError}
            </div>
          )}

          {!isLoadingFile && !fileError && fileContent !== null && (
            <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed">
              {fileContent}
            </pre>
          )}

          {!isLoadingFile && !fileError && fileContent === null && (
            <div className="h-full flex items-center justify-center text-slate-600">
              Select a file from the explorer sidebar to view its contents.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}