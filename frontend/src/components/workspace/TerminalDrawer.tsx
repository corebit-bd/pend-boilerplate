'use client';

import React, { useState } from 'react';

export interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  /** Active workspace project directory name (e.g., "headstart", "medicore", "pend-boilerplate") */
  projectName?: string;
}

/**
 * Renders the integrated terminal and diagnostics drawer at the bottom of the IDE.
 */
export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  activeTab = 'terminal',
  onTabChange,
  projectName = 'pend-boilerplate',
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [shells] = useState(['zsh', 'Python backend', 'node frontend']);
  const [selectedShell, setSelectedShell] = useState('zsh');

  if (!isOpen) return null;

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="w-full h-48 bg-lightmode-brightgray30-100 border-t border-slate-800 flex flex-col text-xs font-mono select-none" data-testid="terminal-drawer">
      {/* Terminal Header Tabs & Actions */}
      <div className="flex items-center justify-between px-3 bg-[#141414] border-b border-slate-800 h-8 shrink-0">
        <div className="flex items-center gap-4 text-slate-400">
          <button
            onClick={() => handleTabClick('problems')}
            className={`hover:text-slate-200 transition-colors pb-1 border-b-2 ${
              currentTab === 'problems' ? 'border-indigo-500 text-slate-100 font-medium' : 'border-transparent'
            }`}
          >
            Problems <span className="ml-1 px-1.5 py-0.2 bg-slate-800 text-[10px] rounded-full text-slate-300">0</span>
          </button>
          <button
            onClick={() => handleTabClick('output')}
            className={`hover:text-slate-200 transition-colors pb-1 border-b-2 ${
              currentTab === 'output' ? 'border-indigo-500 text-slate-100 font-medium' : 'border-transparent'
            }`}
          >
            Output
          </button>
          <button
            onClick={() => handleTabClick('debug')}
            className={`hover:text-slate-200 transition-colors pb-1 border-b-2 ${
              currentTab === 'debug' ? 'border-indigo-500 text-slate-100 font-medium' : 'border-transparent'
            }`}
          >
            Debug Console
          </button>
          <button
            onClick={() => handleTabClick('terminal')}
            className={`hover:text-slate-200 transition-colors pb-1 border-b-2 ${
              currentTab === 'terminal' ? 'border-indigo-500 text-slate-100 font-medium' : 'border-transparent'
            }`}
          >
            Terminal
          </button>
        </div>

        {/* Right Actions: Shell Selector & Close */}
        <div className="flex items-center gap-3 text-slate-400">
          <select
            aria-label="Select Shell Environment"
            value={selectedShell}
            onChange={(e) => setSelectedShell(e.target.value)}
            className="bg-[#1e1e1e] border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-[11px] focus:outline-none"
          >
            {shells.map((shell) => (
              <option key={shell} value={shell}>
                {shell}
              </option>
            ))}
          </select>
          <button onClick={onClose} className="hover:text-white p-1" title="Close Terminal">
            ✕
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="flex-1 p-3 bg-lightmode-brightgray30-100 text-slate-300 overflow-y-auto">
        {currentTab === 'terminal' && (
          <div className="flex flex-col gap-1">
            <div className="text-slate-500 text-[11px]">
              jeetzhkhondker@CoreBit {projectName} % <span className="animate-pulse">_</span>
            </div>
          </div>
        )}
        {currentTab === 'problems' && (
          <div className="text-slate-500 text-[11px]">No problems have been detected in the workspace.</div>
        )}
        {currentTab === 'output' && (
          <div className="text-slate-500 text-[11px]">Workspace task runner output initialized...</div>
        )}
        {currentTab === 'debug' && (
          <div className="text-slate-500 text-[11px]">No active debug sessions running.</div>
        )}
      </div>
    </div>
  );
};