/**
 * Utility functions for Monaco Editor Language Mapping & Breadcrumb Parsing.
 */

/**
 * Resolves the Monaco Editor Language Identifier based on a File Path / Extension.
 *
 * @param filePath - The Relative / Absolute File Path.
 * @returns The corresponding Monaco Language String (Example : 'python', 'typescript', 'json').
 */
export function getLanguageFromPath(filePath: string): string {
    if (!filePath) return 'plaintext';
  
    const lower = filePath.toLowerCase();
    const filename = lower.split('/').pop() || '';
    const ext = filename.split('.').pop() || '';
  
    if (filename.includes('dockerfile')) return 'dockerfile';
    if (filename.startsWith('.env')) return 'ini';
    if (filename === '.gitignore' || filename.includes('git')) return 'ini';
  
    switch (ext) {
      case 'py':
        return 'python';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      case 'yml':
      case 'yaml':
        return 'yaml';
      case 'sql':
        return 'sql';
      case 'md':
      case 'mdx':
        return 'markdown';
      case 'html':
        return 'html';
      case 'css':
      case 'scss':
        return 'css';
      case 'sh':
      case 'bash':
        return 'shell';
      default:
        return 'plaintext';
    }
}
  
/**
 * Parses a Relative File Path into Breadcrumb Segments for Top Header Navigation.
 *
 * @param filePath - The Active File Relative Path (Example : "backend/mcp_server/routes/llm.py").
 * @returns An Array of Breadcrumb Segments.
 */
export function parseBreadcrumbs(filePath: string): string[] {
    if (!filePath) return [];
    return filePath.split('/').filter(Boolean);
}