import React from 'react';

/**
 * Props for the {@link FileIcon} component.
 */
export interface FileIconProps {
  /** The filename or relative path used to infer the corresponding file type icon */
  filename: string;
  /** Flag indicating whether the node is a directory */
  isDirectory?: boolean;
  /** Flag indicating whether a directory node is currently expanded */
  isOpen?: boolean;
  /** Optional custom CSS classes for sizing and layout overrides */
  className?: string;
}

/**
 * Renders custom SVG brand/type icons (Python, TypeScript, Markdown, YAML, Docker, Git, etc.)
 * based on file extension or directory status.
 *
 * @param props - {@link FileIconProps}
 * @returns An inline SVG element corresponding to the resolved file type.
 */
export const FileIcon: React.FC<FileIconProps> = ({
  filename,
  isDirectory = false,
  isOpen = false,
  className = 'w-4 h-4 shrink-0',
}) => {
  if (isDirectory) {
    return isOpen ? (
      <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="folder-open-icon">
        <path d="M1.5 3A1.5 1.5 0 000 4.5v8A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H7.414L5.707 2.793A1 1 0 005 2.5H1.5z" fill="#DCB67A" />
      </svg>
    ) : (
      <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="folder-closed-icon">
        <path d="M1.5 2.5A1.5 1.5 0 000 4v8A1.5 1.5 0 001.5 13.5h13a1.5 1.5 0 001.5-1.5V5a1.5 1.5 0 00-1.5-1.5H7.414L5.707 2.086A1 1 0 005 1.8H1.5z" fill="#C0AD79" />
      </svg>
    );
  }

  const lowerName = filename.toLowerCase();
  const ext = lowerName.split('.').pop() || '';

  // Python (.py)
  if (ext === 'py') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-python">
        <path d="M7.9 1c-3.6 0-3.4 1.6-3.4 1.6v1.6h3.5v.5H3.1S1 4.5 1 8.2s1.8 3.5 1.8 3.5h1.1V10s-.1-2.2 2.2-2.2h3.7s2.1 0 2.1-2.1V3.4S12.3 1 7.9 1zm-1.9 1a.7.7 0 110 1.4.7.7 0 010-1.4z" fill="#3776AB" />
        <path d="M8.1 15c3.6 0 3.4-1.6 3.4-1.6v-1.6H8v-.5h4.9s2.1.2 2.1-3.5-1.8-3.5-1.8-3.5h-1.1V6s.1 2.2-2.2 2.2H6.2s-2.1 0-2.1 2.1v2.3s-.4 2.4 4 2.4zm1.9-1a.7.7 0 110-1.4.7.7 0 010 1.4z" fill="#FFD43B" />
      </svg>
    );
  }

  // TypeScript / React TSX (.ts, .tsx)
  if (ext === 'ts' || ext === 'tsx') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-typescript">
        <rect width="16" height="16" rx="2" fill="#3178C6" />
        <path d="M11.5 12.5c.6 0 1.1-.3 1.4-.8l-.9-.6c-.2.3-.3.4-.5.4-.2 0-.4-.1-.4-.4V8.5h-1.2V7.4h3.6v1.1h-1.2v3.9c.1.1.2.1.2.1zM5 12.5c.8 0 1.4-.4 1.7-1l-.9-.5c-.2.3-.4.5-.8.5-.5 0-.8-.3-.8-.8s.3-.8.8-.8c.4 0 .6.2.8.4l.9-.6c-.4-.6-1-1-1.7-1-1.2 0-2 .8-2 2s.8 2 2 2z" fill="#FFFFFF" />
      </svg>
    );
  }

  // JavaScript / React JSX (.js, .jsx)
  if (ext === 'js' || ext === 'jsx') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-javascript">
        <rect width="16" height="16" rx="2" fill="#F7DF1E" />
        <path d="M10.8 12.2c.6 0 1-.2 1.3-.7l-.9-.5c-.2.3-.3.4-.5.4-.3 0-.4-.2-.4-.6V7.5h-1.2V11c0 .8.6 1.2 1.7 1.2zm-4.3 0c1 0 1.5-.5 1.5-1.2 0-.8-.5-1.1-1.2-1.4l-.4-.2c-.3-.1-.4-.2-.4-.4 0-.2.2-.3.4-.3.3 0 .5.1.7.4l.8-.6c-.3-.5-.8-.7-1.5-.7-1 0-1.5.5-1.5 1.2 0 .7.4 1.1 1.2 1.3l.4.2c.3.1.4.2.4.4 0 .2-.2.4-.5.4-.4 0-.7-.2-.9-.6l-.8.6c.4.6 1 0 1.8 0z" fill="#000000" />
      </svg>
    );
  }

  // Markdown (.md, .mdx)
  if (ext === 'md' || ext === 'mdx') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-markdown">
        <rect width="16" height="16" rx="2" fill="#083344" />
        <path d="M3 4h10v8H3V4zm2 2v4h1V8l1 1 1-1v2h1V6H8L7 7 6 6H5zm6 2h-1v2h1V8zm1-2l-1.5 1.5L11 6v4h2V6z" fill="#38BDF8" />
      </svg>
    );
  }

  // YAML (.yml, .yaml)
  if (ext === 'yml' || ext === 'yaml') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-yaml">
        <rect width="16" height="16" rx="2" fill="#155E75" />
        <text x="2" y="11" fontSize="8" fontWeight="bold" fill="#67E8F9" fontFamily="sans-serif">YML</text>
      </svg>
    );
  }

  // JSON (.json)
  if (ext === 'json') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-json">
        <rect width="16" height="16" rx="2" fill="#854D0E" />
        <text x="1.5" y="11" fontSize="7" fontWeight="bold" fill="#FDE047" fontFamily="sans-serif">&#123; &#125;</text>
      </svg>
    );
  }

  // Environment (.env)
  if (lowerName.startsWith('.env')) {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-env">
        <rect width="16" height="16" rx="2" fill="#14532D" />
        <path d="M8 3v10M5 6l3-3 3 3" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Git / Ignore (.gitignore, .gitguardian.yaml)
  if (lowerName.includes('git')) {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-git">
        <path d="M15.2 7.2L8.8.8c-.4-.4-1-.4-1.4 0L5.3 2.9l1.9 1.9c.4-.1.9 0 1.2.3.5.5.5 1.2.1 1.7L10.3 8.6c.3-.1.6 0 .9.2.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5L7.2 7.7V11c.2.1.3.3.3.6 0 .6-.5 1.1-1.1 1.1s-1.1-.5-1.1-1.1c0-.4.2-.8.6-1V6c-.4-.2-.6-.6-.6-1 0-.4.2-.8.5-1L3.9 2.1.8 5.2c-.4.4-.4 1 0 1.4l6.4 6.4c.4.4 1 .4 1.4 0l6.6-6.6c.4-.3.4-1 0-1.3z" fill="#F05032" />
      </svg>
    );
  }

  // Docker (Dockerfile, docker-compose.yaml)
  if (lowerName.includes('docker')) {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-docker">
        <path d="M15.8 7.3c-.3-.2-.9-.3-1.4-.2-.2-.4-.6-.7-1-.9L13 6h-1v1.3c0 .2.1.4.3.5l.8.4c-.1.5-.4 1-1 1.3H1c-.3 0-.6.1-.8.4-.2.3-.2.7 0 1C1.2 12.1 3.5 14 8 14c4.8 0 7.2-2.1 7.8-4.8.3-.1.6-.3.8-.6.2-.3.2-.8 0-1.3z" fill="#2496ED" />
      </svg>
    );
  }
  
  // SQL Database (.sql)
  if (ext === 'sql') {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-sql">
        <path d="M8 1C4.7 1 2 1.9 2 3v10c0 1.1 2.7 2 6 2s6-.9 6-2V3c0-1.1-2.7-2-6-2z" fill="#336791" opacity="0.2" />
        <path d="M8 1C4.7 1 2 1.9 2 3s2.7 2 6 2 6-.9 6-2-2.7-2-6-2zm0 3c-2.8 0-4.5-.7-4.9-1.3C3.5 2.1 5.2 1.5 8 1.5s4.5.6 4.9 1.2C12.5 3.3 10.8 4 8 4z" fill="#336791" />
        <path d="M2 6v2c0 1.1 2.7 2 6 2s6-.9 6-2V6c0 1.1-2.7 2-6 2S2 7.1 2 6zm0 4v2c0 1.1 2.7 2 6 2s6-.9 6-2v-2c0 1.1-2.7 2-6 2S2 11.1 2 10z" fill="#336791" />
      </svg>
    );
  }

  // Default File Icon
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" data-testid="icon-default">
      <path d="M3 2c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V5l-3-3H3z" fill="#94A3B8" />
      <path d="M10 2v3h3" fill="#64748B" />
    </svg>
  );
};