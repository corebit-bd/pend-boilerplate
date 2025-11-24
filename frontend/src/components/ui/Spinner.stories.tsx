import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";
import { Button } from "./Button";

const meta = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Spinner Size",
    },
    label: {
      control: "text",
      description: "Accessible Label For Screen Readers",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {},
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

export const ExtraExtraLarge: Story = {
  args: {
    size: "2xl",
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
      <Spinner size="2xl" />
    </div>
  ),
};

// With Colors
export const WithColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="text-blue-600" />
      <Spinner className="text-green-600" />
      <Spinner className="text-red-600" />
      <Spinner className="text-yellow-600" />
      <Spinner className="text-purple-600" />
      <Spinner className="text-gray-600" />
    </div>
  ),
};

// Custom Label
export const CustomLabel: Story = {
  args: {
    label: "Processing Your Request ... .. .",
  },
};

// In Button
export const InButton: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button isLoading>Loading ... .. .</Button>
      <Button variant="secondary" isLoading>
        Processing
      </Button>
      <Button variant="outline" isLoading>
        Please Wait
      </Button>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Spinner size="sm" />
        <span className="text-sm text-gray-600">Loading Data ... .. .</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner size="sm" className="text-blue-600" />
        <span className="text-sm text-gray-600">Syncing ... .. .</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner size="sm" className="text-green-600" />
        <span className="text-sm text-gray-600">Uploading Files ... .. .</span>
      </div>
      <div className="flex items-center gap-3">
        <Spinner size="sm" className="text-red-600" />
        <span className="text-sm text-gray-600">Processing ... .. .</span>
      </div>
    </div>
  ),
};

// Centered Loading
export const CenteredLoading: Story = {
  render: () => (
    <div className="flex items-center justify-center h-64 w-96 bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="xl" className="text-blue-600" />
        <p className="text-sm text-gray-600">Loading content...</p>
      </div>
    </div>
  ),
};

// Full Page Loading
export const FullPageLoading: Story = {
  render: () => (
    <div className="flex items-center justify-center h-96 w-full">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="2xl" className="text-blue-600" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">Loading ... .. .</p>
          <p className="text-sm text-gray-500 mt-1">
            Please Wait While We Fetch Your Data
          </p>
        </div>
      </div>
    </div>
  ),
};

// Card Loading
export const CardLoading: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-64 p-6">
        <div className="flex items-center justify-center h-32">
          <Spinner size="lg" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Loading Card Data ... .. .
        </p>
      </div>
      <div className="w-64 p-6">
        <div className="flex items-center justify-center h-32">
          <Spinner size="lg" className="text-green-600" />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Processing Payment ... .. .
        </p>
      </div>
    </div>
  ),
};

// Inline Loading
export const InlineLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Spinner size="xs" />
        <span className="text-sm">Sending Message ... .. .</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner size="xs" className="text-blue-600" />
        <span className="text-sm">Updating Profile ... .. .</span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner size="xs" className="text-green-600" />
        <span className="text-sm">Saving Changes ... .. .</span>
      </div>
    </div>
  ),
};

// Real-World Examples
export const FormSubmitting: Story = {
  render: () => (
    <div className="w-80 p-6">
      <h3 className="text-lg font-semibold mb-4">Contact Form</h3>
      <div className="space-y-3 mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          disabled
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          disabled
        />
        <textarea
          placeholder="Message"
          className="w-full p-2 border rounded"
          rows={3}
          disabled
        />
      </div>
      <Button className="w-full" disabled>
        <Spinner size="sm" className="mr-2" />
        Submitting Contact Form ...
      </Button>
    </div>
  ),
};

export const DataFetching: Story = {
  render: () => (
    <div className="w-96 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        &emsp;
        <Spinner size="sm" className="text-gray-400" />
      </div>
      <div className="space-y-2 text-gray-400">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
      </div>
    </div>
  ),
};
