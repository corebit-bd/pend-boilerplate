'use client';

import React, { useState } from 'react';
import { FileTree } from '@/components/workspace/FileTree';
import { CodeEditor } from '@/components/workspace/CodeEditor';
import { TerminalDrawer } from '@/components/workspace/TerminalDrawer';
import { fetchFileContent } from '@/lib/api/workspace';

export default function WorkspacePage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);

  const handleSelectFile = async (path: string) => {
    setSelectedPath(path);
    setFileError(null);

    try {
      const res = await fetchFileContent(path);
      setFileContent(res.content);
    } catch (err) {
      console.error(`Failed to load file content for ${path}:`, err);
      setFileError(err instanceof Error ? err.message : 'Failed to fetch file content');
      setFileContent('');
    }
  };

  return (
    <div className="flex h-screen w-full bg-lightmode-brightgray30-100 text-slate-100 font-sans overflow-hidden">
      {/* Sidebar / Explorer Panel */}
      <aside className="w-64 border-r border-slate-800 bg-[#141414] flex flex-col shrink-0">
        <div className="px-4 py-3 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none flex justify-between items-center">
          <span>Explorer</span>
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="text-[10px] text-indigo-400 hover:underline"
          >
            {isTerminalOpen ? 'Hide Terminal' : 'Show Terminal'}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <FileTree onSelectFile={handleSelectFile} selectedFilePath={selectedPath} />
        </div>
      </aside>

      {/* Main Content Area (Editor + Terminal Drawer) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-lightmode-brightgray30-100">
        {fileError && (
          <div className="m-4 text-xs text-red-400 bg-red-950/20 border border-red-900/50 p-3 rounded">
            {fileError}
          </div>
        )}

        <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              filePath={selectedPath}
              content={fileContent}
              onChange={(val) => setFileContent(val || '')}
            />
          </div>

          <TerminalDrawer
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            projectName="pend-boilerplate" // Or dynamically bound to current active workspace project
          />
        </div>
      </main>
    </div>
  );
}