// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { TerminalDrawer } from './TerminalDrawer';

/**
 * Storybook metadata for the {@link TerminalDrawer} component.
 */
const meta: Meta<typeof TerminalDrawer> = {
  title: 'IDE/TerminalDrawer',
  component: TerminalDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="w-full h-80 bg-lightmode-brightgray30-100 flex flex-col justify-end">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isOpen: { control: 'boolean' },
    projectName: { control: 'text' },
    activeTab: {
      control: { type: 'select' },
      options: ['terminal', 'problems', 'output', 'debug'],
    },
    onClose: { action: 'closed' },
    onTabChange: { action: 'tabChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof TerminalDrawer>;

export const DefaultTerminal: Story = {
  args: {
    isOpen: true,
    projectName: 'pend-boilerplate',
    activeTab: 'terminal',
  },
};

export const CustomProjectWorkspace: Story = {
  args: {
    isOpen: true,
    projectName: 'medicore',
    activeTab: 'terminal',
  },
};

export const ProblemsTab: Story = {
  args: {
    isOpen: true,
    projectName: 'headstart',
    activeTab: 'problems',
  },
};

export const OutputTab: Story = {
  args: {
    isOpen: true,
    projectName: 'corebit-platform',
    activeTab: 'output',
  },
};

export const DebugConsoleTab: Story = {
  args: {
    isOpen: true,
    projectName: 'pend-boilerplate',
    activeTab: 'debug',
  },
};

export const ClosedState: Story = {
  args: {
    isOpen: false,
  },
};