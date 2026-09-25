import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TerminalDrawer } from './TerminalDrawer';

const meta: Meta<typeof TerminalDrawer> = {
  title: 'Workspace/TerminalDrawer',
  component: TerminalDrawer,
};

export default meta;
type Story = StoryObj<typeof TerminalDrawer>;

export const Default: Story = {
  args: {
    logs: ['$ echo "Terminal Output Ready"\n', 'Terminal Output Ready\n'],
    onRunCommand: (cmd) => console.log('Command submitted:', cmd),
  },
};