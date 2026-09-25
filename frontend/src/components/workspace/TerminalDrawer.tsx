import React, { useState } from 'react';

/** Props Interface for TerminalDrawer Component. */
export interface TerminalDrawerProps {
  /** Output Log Lines received over WebSocket. */
  logs: string[];
  /** Callback triggered when User submits a Command. */
  onRunCommand: (command: string) => void;
}

/**
 * Interactive Terminal Window Component streaming CLI Output.
 */
export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  logs,
  onRunCommand,
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onRunCommand(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 p-3" data-testid="terminal-drawer">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        Terminal Execution Output
      </h3>
      <div className="flex-1 bg-black rounded p-2 font-mono text-[11px] text-emerald-400 overflow-y-auto whitespace-pre-wrap border border-slate-800">
        {logs.join('') || <span className="text-slate-600">Terminal Ready ... .. .</span>}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex space-x-2">
        <input
          type="text"
          placeholder="Execute Shell Command ... .. ."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1 rounded font-medium"
        >
          Run
        </button>
      </form>
    </div>
  );
};