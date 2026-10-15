import React, { useState } from 'react';

/** Props for AgentDispatcher Component. */
export interface AgentDispatcherProps {
  /** Callback triggered when User dispatches Prompt. */
  onDispatch: (prompt: string, targetFile: string) => void;
  /** Loading State Indicator. */
  isLoading?: boolean;
  /** Pre-populated or selected target file path. */
  targetFile?: string;
}

/**
 * Task Dispatcher Panel for routing Prompts to SKILLS.md Backend Agents.
 */
export const AgentDispatcher: React.FC<AgentDispatcherProps> = ({
  onDispatch,
  isLoading = false,
  targetFile = '',
}) => {
  const [prompt, setPrompt] = useState('');
  const [userEditedTarget, setUserEditedTarget] = useState<string | null>(null);

  // If the user hasn't manually typed a custom override, reflect the external targetFile prop.
  // Otherwise, allow user edits to persist until cleared or reset.
  const currentTargetFile = userEditedTarget !== null ? userEditedTarget : targetFile;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onDispatch(prompt, currentTargetFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 bg-slate-950/60 p-3 rounded border border-slate-800" data-testid="agent-dispatcher">
      <input
        type="text"
        placeholder="Target file path (optional)"
        value={currentTargetFile}
        onChange={(e) => setUserEditedTarget(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
      />
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter agent task prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-1.5 rounded font-medium disabled:opacity-50"
        >
          {isLoading ? 'Dispatching ... .. .' : 'Dispatch'}
        </button>
      </div>
    </form>
  );
};