import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "tertiary", "danger"],
      description: "Button Style Variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button Size",
    },
    isLoading: {
      control: "boolean",
      description: "Loading State with Spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disabled State",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "Button HTML Type",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Primary: Story = {
  args: {
    children: "Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Button",
    variant: "tertiary",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: "Small Button",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium Button",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    size: "lg",
  },
};

// States
export const Loading: Story = {
  args: {
    children: "Loading",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const LoadingWithVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="primary" isLoading>
        Primary Loading
      </Button>
      <Button variant="secondary" isLoading>
        Secondary Loading
      </Button>
      <Button variant="outline" isLoading>
        Outline Loading
      </Button>
      <Button variant="danger" isLoading>
        Danger Loading
      </Button>
    </div>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Button variant="tertiary" disabled>
          Disabled
        </Button>
        <Button variant="danger" disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Button Types
export const ButtonTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button type="button">Type: Button</Button>
      <Button type="submit">Type: Submit</Button>
      <Button type="reset">Type: Reset</Button>
    </div>
  ),
};

// With Icons (Example with Text)
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <span className="mr-2">+</span>
        Add Item
      </Button>
      <Button variant="danger">
        <span className="mr-2">🗑️</span>
        Delete
      </Button>
      <Button variant="outline">
        Download
        <span className="ml-2">⬇️</span>
      </Button>
    </div>
  ),
};

// Real-World Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex gap-2">
        <Button variant="primary" className="flex-1">
          Save Changes
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>

      <div className="flex gap-2">
        <Button variant="danger" size="sm">
          Delete Account
        </Button>
        <Button variant="outline" size="sm">
          Keep Account
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Button variant="primary" isLoading className="w-full">
          Processing Payment
        </Button>
        <Button variant="tertiary" className="w-full">
          Use Different Payment Method
        </Button>
      </div>
    </div>
  ),
};
