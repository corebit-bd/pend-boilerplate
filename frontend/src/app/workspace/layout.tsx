import React from 'react';

export const metadata = {
  title: 'Local IDE Workspace | PEND Framework',
  description: 'Browser-based local developer workspace and agent controller',
};

/**
 * Structural Layout Wrapper for Workspace Subpath.
 */
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      <header className="h-12 border-b border-slate-800 bg-slate-950 px-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-indigo-400 tracking-wide text-sm">
            PEND LOCAL IDE
          </span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs text-slate-400">Workspace Engine v1.0</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>FastAPI Connected</span>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">{children}</main>
    </div>
  );
}