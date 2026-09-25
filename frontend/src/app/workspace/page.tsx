'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  createWebSocketConnection,
  dispatchAgentTask,
  fetchLLMQuota,
  generateLLMContent,
} from '@/lib/api/workspace';
import { FileTree } from '@/components/workspace/FileTree';
import { TerminalDrawer } from '@/components/workspace/TerminalDrawer';
import { AgentDispatcher } from '@/components/workspace/AgentDispatcher';
import {
  AgentDispatchResponse,
  FileNode,
  FilesystemWSFrame,
  LLMGenerateResponse,
  QuotaStatus,
  TerminalWSFrame,
} from '@/types/workspace';

/**
 * Main Web UI IDE Workspace Dashboard View.
 */
export default function WorkspacePage() {
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Use useRef instead of useState to store mutable WebSocket connection
  const terminalWsRef = useRef<WebSocket | null>(null);

  const [agentResult, setAgentResult] = useState<AgentDispatchResponse | null>(null);
  const [llmResult, setLlmResult] = useState<LLMGenerateResponse | null>(null);
  const [quota, setQuota] = useState<QuotaStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fsWs = createWebSocketConnection<FilesystemWSFrame>('filesystem', (data) => {
      if (data.type === 'workspace_snapshot' || data.type === 'workspace_sync') {
        setFileTree(data.data);
      }
    });

    const termWs = createWebSocketConnection<TerminalWSFrame>('terminal', (data) => {
      if (data.type === 'output') {
        setTerminalLogs((prev) => [...prev, data.data]);
      } else if (data.type === 'start') {
        setTerminalLogs((prev) => [...prev, `$ ${data.command}\n`]);
      } else if (data.type === 'exit') {
        setTerminalLogs((prev) => [
          ...prev,
          `\n[Process exited with code ${data.return_code}]\n`,
        ]);
      }
    });

    terminalWsRef.current = termWs;

    fetchLLMQuota().then(setQuota).catch(console.error);

    return () => {
      fsWs.close();
      termWs.close();
      terminalWsRef.current = null;
    };
  }, []);

  const handleRunCommand = (command: string) => {
    if (terminalWsRef.current && terminalWsRef.current.readyState === WebSocket.OPEN) {
      terminalWsRef.current.send(JSON.stringify({ command }));
    }
  };

  const handleDispatchAgent = async (prompt: string, targetFile: string) => {
    setLoading(true);
    try {
      const dispatchRes = await dispatchAgentTask({
        prompt,
        target_file: targetFile || 'documentation/02_design-specifications/01_PROJECT_CHARTER.md',
      });
      setAgentResult(dispatchRes);

      const genRes = await generateLLMContent({
        prompt,
        system_instruction: `You are acting as assigned agent: ${dispatchRes.assigned_agent}`,
      });
      setLlmResult(genRes);

      const updatedQuota = await fetchLLMQuota();
      setQuota(updatedQuota);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex h-full">
      {/* Explorer Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 p-4 flex flex-col">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Explorer
        </h2>
        <div className="flex-1 overflow-y-auto">
          {fileTree ? (
            <FileTree node={fileTree} />
          ) : (
            <span className="text-xs text-slate-500 italic">Loading file snapshot...</span>
          )}
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col border-r border-slate-800 bg-slate-900 p-4 overflow-y-auto space-y-4">
        <AgentDispatcher onDispatch={handleDispatchAgent} isLoading={loading} />

        {agentResult && (
          <div className="bg-slate-950 border border-indigo-900/50 rounded p-3 text-xs">
            <span className="text-indigo-400 font-semibold">Assigned Agent:</span>{' '}
            <span className="text-slate-200 font-mono">{agentResult.assigned_agent}</span>
            <div className="mt-1 text-slate-400">
              Allowed Tools: <span className="font-mono text-slate-300">[{agentResult.allowed_tools.join(', ')}]</span>
            </div>
          </div>
        )}

        {llmResult && (
          <div className="bg-slate-950 border border-slate-800 rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">Model Output ({llmResult.model})</span>
              {llmResult.fallback_used && (
                <span className="text-[10px] bg-amber-900/40 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                  Fallback Mode Active
                </span>
              )}
            </div>
            <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {llmResult.text}
            </pre>
          </div>
        )}
      </div>

      {/* Right Terminal & Metrics Sidebar */}
      <aside className="w-80 bg-slate-950 flex flex-col">
        <div className="flex-1">
          <TerminalDrawer logs={terminalLogs} onRunCommand={handleRunCommand} />
        </div>
        <div className="p-3 border-t border-slate-800 bg-slate-900/40 text-xs">
          <h3 className="font-semibold text-slate-400 uppercase tracking-wider mb-2">
            LLM Quota Status
          </h3>
          {quota ? (
            <div className="space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>RPM Usage:</span>
                <span className="font-mono">{quota.current_rpm} / {quota.rpm_limit}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Tokens:</span>
                <span className="font-mono">{quota.total_tokens_consumed.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <span className="text-slate-500">Loading quota metrics...</span>
          )}
        </div>
      </aside>
    </div>
  );
}