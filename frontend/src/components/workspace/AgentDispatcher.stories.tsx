import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AgentDispatcher } from './AgentDispatcher';

const meta: Meta<typeof AgentDispatcher> = {
  title: 'Workspace/AgentDispatcher',
  component: AgentDispatcher,
};

export default meta;
type Story = StoryObj<typeof AgentDispatcher>;

export const Default: Story = {
  args: {
    onDispatch: (prompt, target) => console.log('Dispatch:', { prompt, target }),
    isLoading: false,
  },
};