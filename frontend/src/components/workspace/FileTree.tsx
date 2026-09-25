import React from 'react';
import { FileNode } from '@/types/workspace';

/** Props Interface for FileTree Component. */
export interface FileTreeProps {
  /** Root filesystem Node Tree. */
  node: FileNode;
}

/**
 * Renders an interactive Tree View representing Workspace Files and Directories.
 */
export const FileTree: React.FC<FileTreeProps> = ({ node }) => {
  return (
    <div className="ml-2 font-mono text-xs select-none" data-testid="file-tree">
      <div className="flex items-center space-x-1.5 py-0.5 text-slate-300">
        <span>{node.type === 'directory' ? '📁' : '📄'}</span>
        <span className={node.type === 'directory' ? 'text-indigo-400 font-medium' : 'text-slate-300'}>
          {node.name}
        </span>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="border-l border-slate-800 ml-2 pl-2 space-y-0.5">
          {node.children.map((child, idx) => (
            <FileTree key={`${child.name}-${idx}`} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};