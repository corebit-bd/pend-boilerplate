'use client';

import React, { useState, useEffect } from 'react';
import { fetchFileTree, FileNode } from '@/lib/api/workspace';
import { FileIcon } from './FileIcon';

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
    <div className="select-none font-sans text-xs">
      <div
        onClick={handleToggle}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer transition-colors ${
          isSelected
            ? 'bg-[#37373d] text-white font-medium'
            : 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'
        } ${node.is_ignored ? 'opacity-40 hover:opacity-75' : ''}`}
      >
        <FileIcon
          filename={node.name}
          isDirectory={node.is_directory}
          isOpen={isOpen}
        />
        <span className="truncate">{node.name}</span>
        {isLoading && (
          <span className="ml-auto text-[10px] text-slate-500 animate-pulse font-sans">
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