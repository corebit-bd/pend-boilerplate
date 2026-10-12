// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { CodeEditor } from './CodeEditor';

/**
 * Storybook metadata for the {@link CodeEditor} component.
 */
const meta: Meta<typeof CodeEditor> = {
  title: 'IDE/CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="w-full h-150 bg-lightmode-brightgray30-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const PythonFile: Story = {
  args: {
    filePath: 'backend/manage.py',
    content: `#!/usr/bin/env python\n"""Django's command-line utility for administrative tasks."""\nimport os\nimport sys\n\ndef main():\n    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.base")\n    try:\n        from django.core.management import execute_from_command_line\n    except ImportError as exc:\n        raise ImportError("Couldn't import Django.") from exc\n    execute_from_command_line(sys.argv)\n\nif __name__ == "__main__":\n    main()\n`,
  },
};

export const TypeScriptReactFile: Story = {
  args: {
    filePath: 'frontend/components/workspace/CodeEditor.tsx',
    content: `import React from 'react';\nimport Editor from '@monaco-editor/react';\n\nexport const CodeEditor = () => {\n  return <Editor height="100%" theme="vs-dark" />;\n};\n`,
  },
};

export const SQLFile: Story = {
  args: {
    filePath: 'database/migrations/0001_initial.sql',
    content: `CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);\n`,
  },
};

export const NoFileSelected: Story = {
  args: {
    filePath: null,
    content: '',
  },
};