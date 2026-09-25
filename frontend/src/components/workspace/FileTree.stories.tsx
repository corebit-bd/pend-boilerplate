import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FileTree } from './FileTree';

const meta: Meta<typeof FileTree> = {
  title: 'Workspace/FileTree',
  component: FileTree,
};

export default meta;
type Story = StoryObj<typeof FileTree>;

export const Default: Story = {
  args: {
    node: {
      name: 'root',
      type: 'directory',
      children: [
        {
          name: 'backend',
          type: 'directory',
          children: [{ name: 'main.py', type: 'file' }],
        },
        { name: 'README.md', type: 'file' },
      ],
    },
  },
};