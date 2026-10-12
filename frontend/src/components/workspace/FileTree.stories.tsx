// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { FileTree } from './FileTree';
import { FileIcon } from './FileIcon';

const meta: Meta<typeof FileTree> = {
  title: 'IDE/FileTree',
  component: FileTree,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1e1e1e' }],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64 h-96 bg-lightmode-brightgray30-100 border border-slate-800 text-slate-300 p-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FileTree>;

export const DefaultExplorer: Story = {
  args: {
    selectedFilePath: 'backend/main.py',
  },
};

export const CustomIconsPreview = () => (
  <div className="p-4 bg-lightmode-brightgray30-100 text-slate-300 flex flex-col gap-2 font-sans text-xs">
    <div className="flex items-center gap-2"><FileIcon filename="app.py" /> app.py</div>
    <div className="flex items-center gap-2"><FileIcon filename="Component.tsx" /> Component.tsx</div>
    <div className="flex items-center gap-2"><FileIcon filename="styles.css" /> styles.css</div>
    <div className="flex items-center gap-2"><FileIcon filename="docker-compose.yml" /> docker-compose.yml</div>
    <div className="flex items-center gap-2"><FileIcon filename=".env.local" /> .env.local</div>
    <div className="flex items-center gap-2"><FileIcon filename=".gitignore" /> .gitignore</div>
    <div className="flex items-center gap-2"><FileIcon filename="src" isDirectory={true} isOpen={false} /> src (Closed)</div>
    <div className="flex items-center gap-2"><FileIcon filename="src" isDirectory={true} isOpen={true} /> src (Open)</div>
  </div>
);