// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { FileTree } from './FileTree';

const meta: Meta<typeof FileTree> = {
  title: 'Workspace/FileTree',
  component: FileTree,
};

export default meta;
type Story = StoryObj<typeof FileTree>;

export const Default: Story = {
  args: {
    selectedFilePath: 'src/App.tsx',
  },
};