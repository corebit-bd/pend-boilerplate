/**
 * Represents a File or Folder Node in the Workspace filesystem Tree.
 */
export interface FileNode {
    /** Node Display Name or filename */
    name: string;
    /** Node Resource Classification */
    type: 'file' | 'directory';
    /** Nested Child Nodes if type is Directory */
    children?: FileNode[];
}
  
/**
 * Payload sent to the SKILLS.md Agent Task Router.
 */
export interface AgentDispatchPayload {
    /** Task Prompt or Specification Instruction */
    prompt: string;
    /** Relative Path to Target File being modified or generated */
    target_file: string;
}

/**
 * Response Structure returned by Agent Task Dispatch.
 */
export interface AgentDispatchResponse {
    /** Identifier of the assigned SKILLS.md Agent */
    assigned_agent: string;
    /** Array of Tool Permissions granted to the Agent */
    allowed_tools: string[];
    /** Execution Status String */
    status: string;
}

/**
 * Payload sent to the Hybrid LLM Engine.
 */
export interface LLMGeneratePayload {
    /** Primary Text Prompt */
    prompt: string;
    /** Optional System Instruction override */
    system_instruction?: string;
    /** Force Fallback Mode Execution */
    force_fallback?: boolean;
}

/**
 * Response Structure returned from Hybrid LLM Engine.
 */
export interface LLMGenerateResponse {
    /** Generated Content Output */
    text: string;
    /** Model Name used for execution */
    model: string;
    /** Indicates whether Secondary Fallback Provider was invoked */
    fallback_used: boolean;
}

/**
 * LLM Rate-Limiting and Quota Metrics Status.
 */
export interface QuotaStatus {
    /** Requests Per Minute Limit */
    rpm_limit: number;
    /** Current Active RPM Usage */
    current_rpm: number;
    /** Cumulative Token Count consumed */
    total_tokens_consumed: number;
    /** Indicates whether Rate Limit Threshold is hit */
    rate_limited: boolean;
    /** Indicates whether Fallback Mode is active */
    fallback_active: boolean;
}

/**
 * Terminal WebSocket Event Payloads.
 */
export interface TerminalWSOutputFrame {
    type: 'output';
    data: string;
}
  
export interface TerminalWSStartFrame {
    type: 'start';
    command: string;
}
  
export interface TerminalWSExitFrame {
    type: 'exit';
    return_code: number;
}
  
export type TerminalWSFrame =
    | TerminalWSOutputFrame
    | TerminalWSStartFrame
    | TerminalWSExitFrame;

/**
 * File System WebSocket Event Payloads.
 */
export interface FilesystemWSFrame {
    type: 'workspace_snapshot' | 'workspace_sync';
    data: FileNode;
}
  
/** Union of all possible WebSocket Message Structures */
export type WSMessagePayload = TerminalWSFrame | FilesystemWSFrame | string;