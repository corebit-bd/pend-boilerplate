'use client';

import React, { useState } from 'react';
import { FileTree } from '@/components/workspace/FileTree';
import { CodeEditor } from '@/components/workspace/CodeEditor';
import { TerminalDrawer } from '@/components/workspace/TerminalDrawer';
import { AgentDispatcher } from '@/components/workspace/AgentDispatcher';
import { dispatchAgentTask, fetchFileContent } from '@/lib/api/workspace';

export default function WorkspacePage() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [fileError, setFileError] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);
  const [isAgentPanelOpen, setIsAgentPanelOpen] = useState<boolean>(true);

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
      {/* 1. Sidebar / Explorer Panel */}
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

      {/* 2. Main Content Area (Editor + Terminal Drawer) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-lightmode-brightgray30-100">
        {fileError && (
          <div className="m-4 text-xs text-red-400 bg-red-950/20 border border-red-900/50 p-3 rounded">
            {fileError}
          </div>
        )}

        <div className="flex-1 w-full h-full overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            <CodeEditor
              filePath={selectedPath}
              content={fileContent}
              onChange={(val) => setFileContent(val || '')}
            />

            {/* Quick Toggle for Right AI Agent Panel */}
            <button
              onClick={() => setIsAgentPanelOpen(!isAgentPanelOpen)}
              className="absolute top-2 right-2 z-10 bg-[#1e1e1e] border border-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs hover:bg-slate-800 transition-colors shadow-lg"
              title="Toggle AI Agent Panel"
            >
              {isAgentPanelOpen ? 'Hide Agent Panel 🤖' : 'Show Agent Panel 🤖'}
            </button>
          </div>

          <TerminalDrawer
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            projectName="pend-boilerplate"
          />
        </div>
      </main>

      {/* 3. Right-Side AI Chat & Agent Panel */}
      {isAgentPanelOpen && (
        <aside className="w-96 border-l border-slate-800 bg-[#141414] flex flex-col shrink-0">
          <AgentDispatcher
            targetFile={selectedPath || ''}
            onDispatch={async (prompt, targetFile) => {
              try {
                console.log('Dispatching agent task...', { prompt, targetFile });
                
                const payload = {
                  prompt,
                  target_file: targetFile || '',
                };

                const result = await dispatchAgentTask(payload);
                console.log('Agent response received:', result);

                if (result.file_updated && targetFile) {
                  const freshContent = await fetchFileContent(targetFile);
                  setFileContent(freshContent.content);
                  console.log(`Agent successfully updated ${targetFile}! ✨`);
                } else {
                  console.log(`Agent task dispatched to ${result.assigned_agent}`);
                }
              } catch (error) {
                console.error('Agent dispatch error:', error);
                alert('Failed to execute agent task.');
              }
            }}
          />
        </aside>
      )}
    </div>
  );
}