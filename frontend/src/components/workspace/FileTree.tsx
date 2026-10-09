'use client';

import React, { useState, useEffect } from 'react';
import { fetchFileTree, FileNode } from '@/lib/api/workspace';

export interface FileTreeProps {
  /** Optional file selection callback trigger */
  onSelectFile?: (path: string) => void;
  /** Currently selected relative file path */
  selectedFilePath?: string | null;
}

interface TreeNodeProps {
  node: FileNode;
  onSelectFile?: (path: string) => void;
  selectedFilePath?: string | null;
  depth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSelectFile, selectedFilePath, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<FileNode[]>(node.children || []);
  const [isLoading, setIsLoading] = useState(false);

  const isSelected = selectedFilePath === node.path;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (node.is_directory) {
      if (!isOpen && children.length === 0) {
        setIsLoading(true);
        try {
          const fetchedChildren = await fetchFileTree(node.path);
          setChildren(fetchedChildren);
        } catch (err) {
          console.error(`Error loading directory ${node.path}:`, err);
        } finally {
          setIsLoading(false);
        }
      }
      setIsOpen(!isOpen);
    } else {
      onSelectFile?.(node.path);
    }
  };

  return (
    <div className="select-none font-mono text-xs">
      <div
        onClick={handleToggle}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-slate-800/60 transition-colors ${
          isSelected ? 'bg-slate-800 text-indigo-400 font-medium' : 'text-slate-300'
        } ${node.is_ignored ? 'opacity-40 hover:opacity-75' : ''}`}
      >
        <span className="mr-1.5 w-4 inline-block text-center text-slate-400">
          {node.is_directory ? (isOpen ? '📂' : '📁') : '📄'}
        </span>
        <span className={`truncate ${node.is_directory ? 'text-indigo-300 font-medium' : ''}`}>
          {node.name}
        </span>
        {isLoading && (
          <span className="ml-2 text-[10px] text-slate-500 animate-pulse font-sans">
            loading...
          </span>
        )}
      </div>

      {node.is_directory && isOpen && (
        <div className="border-l border-slate-800/60 ml-3">
          {children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              onSelectFile={onSelectFile}
              selectedFilePath={selectedFilePath}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Renders an interactive Tree View representing Workspace Files and Directories
 * with dynamic shallow loading and selection support.
 */
export const FileTree: React.FC<FileTreeProps> = ({ onSelectFile, selectedFilePath }) => {
  const [rootNodes, setRootNodes] = useState<FileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadRoot() {
      try {
        setLoading(true);
        const nodes = await fetchFileTree('');
        if (isMounted) setRootNodes(nodes);
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Failed to load file tree');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadRoot();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-xs font-mono text-slate-500 animate-pulse">
        Loading workspace tree...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-xs font-mono text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-auto py-2" data-testid="file-tree">
      {rootNodes.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          onSelectFile={onSelectFile}
          selectedFilePath={selectedFilePath}
        />
      ))}
    </div>
  );
};