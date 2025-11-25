import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { Button } from "./Button";

const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: "text",
      description: "Icon Name",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Icon Size",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    icon: "check",
  },
};

// Sizes
export const Small: Story = {
  args: {
    icon: "check",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    icon: "check",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    icon: "check",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    icon: "check",
    size: "xl",
  },
};

// All Sizes
export const AllSizes: Story = {
  args: {
    icon: "check",
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Icon {...args} size="sm" />
      <Icon {...args} size="md" />
      <Icon {...args} size="lg" />
      <Icon {...args} size="xl" />
    </div>
  ),
};

// Common Icons
export const CommonIcons: Story = {
  args: {
    icon: "check",
  },
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon="check" size="lg" />
        <span className="text-xs text-gray-500">check</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="close" size="lg" />
        <span className="text-xs text-gray-500">close</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="menu" size="lg" />
        <span className="text-xs text-gray-500">menu</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="search" size="lg" />
        <span className="text-xs text-gray-500">search</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="user" size="lg" />
        <span className="text-xs text-gray-500">user</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="settings" size="lg" />
        <span className="text-xs text-gray-500">settings</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="home" size="lg" />
        <span className="text-xs text-gray-500">home</span>
      </div>
    </div>
  ),
};

// Arrow Icons
export const ArrowIcons: Story = {
  args: {
    icon: "arrow-right",
  },
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon icon="arrow-right" size="lg" />
        <span className="text-xs text-gray-500">arrow-right</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="arrow-left" size="lg" />
        <span className="text-xs text-gray-500">arrow-left</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon="chevron-down" size="lg" />
        <span className="text-xs text-gray-500">chevron-down</span>
      </div>
    </div>
  ),
};

// With Colors
export const WithColors: Story = {
  args: {
    icon: "check",
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon="check" size="lg" className="text-blue-600" />
      <Icon icon="check" size="lg" className="text-green-600" />
      <Icon icon="close" size="lg" className="text-red-600" />
      <Icon icon="search" size="lg" className="text-yellow-600" />
      <Icon icon="user" size="lg" className="text-purple-600" />
      <Icon icon="settings" size="lg" className="text-gray-600" />
    </div>
  ),
};

// In Buttons
export const InButtons: Story = {
  args: {
    icon: "check",
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Button>
        <Icon icon="check" size="sm" className="mr-2" />
        Confirm
      </Button>
      <Button variant="secondary">
        <Icon icon="user" size="sm" className="mr-2" />
        Profile
      </Button>
      <Button variant="outline">
        <Icon icon="search" size="sm" className="mr-2" />
        Search
      </Button>
      <Button variant="danger">
        <Icon icon="close" size="sm" className="mr-2" />
        Delete
      </Button>
    </div>
  ),
};

// Icon With Text
export const IconWithText: Story = {
  args: {
    icon: "check",
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon icon="check" className="text-green-600" />
        <span>Tasks Completed</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="close" className="text-red-600" />
        <span>Tasks Failed</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="search" className="text-blue-600" />
        <span>Search Results</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon icon="user" className="text-purple-600" />
        <span>User Profile</span>
      </div>
    </div>
  ),
};

// Navigation Icons
export const NavigationIcons: Story = {
  args: {
    icon: "home",
  },
  render: () => (
    <div className="flex gap-2 p-4 border rounded-lg">
      <button className="p-2 hover:bg-gray-100 rounded">
        <Icon icon="home" size="md" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <Icon icon="search" size="md" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <Icon icon="user" size="md" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <Icon icon="settings" size="md" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded">
        <Icon icon="menu" size="md" />
      </button>
    </div>
  ),
};

// Status Icons
export const StatusIcons: Story = {
  args: {
    icon: "check",
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 p-3 border rounded-lg">
        <Icon icon="check" size="lg" className="text-green-600" />
        <div>
          <p className="font-medium">Success</p>
          <p className="text-sm text-gray-500">
            Operation Completed Successfully
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 border rounded-lg">
        <Icon icon="close" size="lg" className="text-red-600" />
        <div>
          <p className="font-medium">Error</p>
          <p className="text-sm text-gray-500">Something Went Wrong</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 border rounded-lg">
        <Icon icon="search" size="lg" className="text-blue-600" />
        <div>
          <p className="font-medium">Information</p>
          <p className="text-sm text-gray-500">Additional Details Available</p>
        </div>
      </div>
    </div>
  ),
};

// Icon Grid
export const IconGrid: Story = {
  args: {
    icon: "check",
  },
  render: () => (
    <div className="grid grid-cols-5 gap-4 p-4 border rounded-lg">
      {[
        "check",
        "close",
        "menu",
        "search",
        "user",
        "settings",
        "home",
        "arrow-right",
        "arrow-left",
        "chevron-down",
      ].map((iconName) => (
        <div
          key={iconName}
          className="flex flex-col items-center gap-2 p-3 border rounded hover:bg-gray-50 cursor-pointer"
        >
          <Icon icon={iconName} size="lg" />
          <span className="text-xs text-gray-500 text-center">{iconName}</span>
        </div>
      ))}
    </div>
  ),
};

// Real-World Examples
export const ActionButtons: Story = {
  args: {
    icon: "settings",
  },
  render: () => (
    <div className="flex gap-2">
      <button className="p-2 border rounded hover:bg-gray-100" title="Edit">
        <Icon icon="settings" />
      </button>
      <button className="p-2 border rounded hover:bg-gray-100" title="Delete">
        <Icon icon="close" className="text-red-600" />
      </button>
      <button className="p-2 border rounded hover:bg-gray-100" title="Share">
        <Icon icon="arrow-right" />
      </button>
    </div>
  ),
};

export const UserProfile: Story = {
  args: {
    icon: "user",
  },
  render: () => (
    <div className="flex items-center gap-3 p-4 border rounded-lg max-w-sm">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Icon icon="user" size="lg" className="text-blue-600" />
      </div>
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-gray-500">john@example.com</p>
      </div>
      <button className="ml-auto p-2 hover:bg-gray-100 rounded">
        <Icon icon="settings" />
      </button>
    </div>
  ),
};
