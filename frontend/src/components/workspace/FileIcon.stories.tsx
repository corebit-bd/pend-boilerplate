// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { FileIcon } from './FileIcon';

/**
 * Storybook metadata for the {@link FileIcon} component.
 */
const meta: Meta<typeof FileIcon> = {
  title: 'IDE/FileIcon',
  component: FileIcon,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#181818' }],
    },
  },
  argTypes: {
    filename: { control: 'text' },
    isDirectory: { control: 'boolean' },
    isOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FileIcon>;

export const Python: Story = {
  args: {
    filename: 'main.py',
  },
};

export const TypeScriptReact: Story = {
  args: {
    filename: 'App.tsx',
  },
};

export const Docker: Story = {
  args: {
    filename: 'docker-compose.yml',
  },
};

export const SQL: Story = {
  args: {
    filename: 'schema.sql',
  },
};

export const FolderClosed: Story = {
  args: {
    filename: 'components',
    isDirectory: true,
    isOpen: false,
  },
};

export const FolderOpen: Story = {
  args: {
    filename: 'components',
    isDirectory: true,
    isOpen: true,
  },
};

/**
 * Visual grid showcasing all supported file icon extensions and states.
 */
export const AllSupportedIcons = () => (
  <div className="p-4 bg-lightmode-brightgray30-100 text-slate-300 grid grid-cols-2 gap-3 font-sans text-xs w-80 rounded border border-slate-800">
    <div className="flex items-center gap-2"><FileIcon filename="main.py" /> main.py</div>
    <div className="flex items-center gap-2"><FileIcon filename="index.ts" /> index.ts</div>
    <div className="flex items-center gap-2"><FileIcon filename="App.tsx" /> App.tsx</div>
    <div className="flex items-center gap-2"><FileIcon filename="script.js" /> script.js</div>
    <div className="flex items-center gap-2"><FileIcon filename="README.md" /> README.md</div>
    <div className="flex items-center gap-2"><FileIcon filename="config.yaml" /> config.yaml</div>
    <div className="flex items-center gap-2"><FileIcon filename="package.json" /> package.json</div>
    <div className="flex items-center gap-2"><FileIcon filename=".env.local" /> .env.local</div>
    <div className="flex items-center gap-2"><FileIcon filename=".gitignore" /> .gitignore</div>
    <div className="flex items-center gap-2"><FileIcon filename="Dockerfile" /> Dockerfile</div>
    <div className="flex items-center gap-2"><FileIcon filename="file.txt" /> file.txt</div>
    <div className="flex items-center gap-2"><FileIcon filename="src" isDirectory={true} isOpen={false} /> Directory (Closed)</div>
    <div className="flex items-center gap-2"><FileIcon filename="src" isDirectory={true} isOpen={true} /> Directory (Open)</div>
  </div>
);