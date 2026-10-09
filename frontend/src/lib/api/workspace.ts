import {
    AgentDispatchPayload,
    AgentDispatchResponse,
    FileContentResponse,
    FileNode,
    LLMGeneratePayload,
    LLMGenerateResponse,
    QuotaStatus,
    WSMessagePayload,
} from '@/types/workspace';

export type { FileNode, FileContentResponse };

const API_BASE_URL = 'http://localhost:8000/ide-workspace/api';
const WS_BASE_URL = 'ws://localhost:8000/ide-workspace/ws';

/**
 * Fetches shallow directory contents for a target relative path.
 *
 * @param path - Relative target directory path (defaults to root workspace "").
 * @returns Promise resolving to an array of FileNode objects.
 * @throws Error if response status is not OK.
 */
export async function fetchFileTree(path: string = ''): Promise<FileNode[]> {
    const res = await fetch(`${API_BASE_URL}/filesystem/tree?path=${encodeURIComponent(path)}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch file tree for path "${path}": ${res.status}`);
    }
    return res.json();
}

/**
 * Fetches raw file content for a target file path.
 *
 * @param path - Relative file path.
 * @returns Promise resolving to FileContentResponse object containing file content.
 * @throws Error if response status is not OK.
 */
export async function fetchFileContent(path: string): Promise<FileContentResponse> {
    const res = await fetch(`${API_BASE_URL}/filesystem/content?path=${encodeURIComponent(path)}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch file content for "${path}": ${res.status}`);
    }
    return res.json();
}
  
/**
 * Dispatches a Prompt to the SKILLS.md Agent Task Router REST Endpoint.
 *
 * @param payload - Target File Path and Prompt Description.
 * @returns Promise resolving to AgentDispatchResponse.
 * @throws Error if Response HTTP Status is not OK.
 */
export async function dispatchAgentTask(
    payload: AgentDispatchPayload
): Promise<AgentDispatchResponse> {
    const res = await fetch(`${API_BASE_URL}/agent/dispatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error(`Agent Dispatch Failed with Status : ${res.status}`);
    }
    return res.json();
}
  
/**
 * Executes a Content Generation Request via the Hybrid LLM Engine.
 *
 * @param payload - Prompt Text, Instructions and Fallback Toggle.
 * @returns Promise resolving to LLMGenerateResponse.
 * @throws Error if API Request fails.
 */
export async function generateLLMContent(
    payload: LLMGeneratePayload
): Promise<LLMGenerateResponse> {
    const res = await fetch(`${API_BASE_URL}/llm/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        throw new Error(`LLM Generation Failed with Status : ${res.status}`);
    }
    return res.json();
}
  
/**
 * Fetches Real-Time LLM Token Usage and Rate Limit Status.
 *
 * @returns Promise resolving to QuotaStatus Object.
 * @throws Error if Network Call fails.
 */
export async function fetchLLMQuota(): Promise<QuotaStatus> {
    const res = await fetch(`${API_BASE_URL}/llm/quota`);
    if (!res.ok) {
        throw new Error(`Failed to fetch quota status: ${res.status}`);
    }
    return res.json();
}
  
/**
 * Establishes a WebSocket Connection to the IDE Workspace Backend.
 *
 * @template T - Expected Incoming Message Payload Type.
 * @param endpoint - Subpath Target ('terminal' | 'filesystem').
 * @param onMessage - Event Handler Invoked when a Payload Frame arrives.
 * @returns Native WebSocket Connection Instance.
 */
export function createWebSocketConnection<T = WSMessagePayload>(
    endpoint: 'terminal' | 'filesystem',
    onMessage: (data: T) => void
  ): WebSocket {
    const ws = new WebSocket(`${WS_BASE_URL}/${endpoint}`);
    ws.onmessage = (event: MessageEvent<string>) => {
      try {
        const parsed = JSON.parse(event.data) as T;
        onMessage(parsed);
      } catch {
        onMessage(event.data as unknown as T);
      }
    };
    return ws;
}