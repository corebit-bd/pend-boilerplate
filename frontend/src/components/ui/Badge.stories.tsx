import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "success", "warning", "error", "information"],
      description: "Badge Color Variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Badge Size",
    },
    dot: {
      control: "boolean",
      description: "Show Dot Indicator",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Standard: Story = {
  args: {
    children: "Standard",
    variant: "standard",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Error",
    variant: "error",
  },
};

export const Information: Story = {
  args: {
    children: "Information",
    variant: "information",
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

// With Dot
export const WithDot: Story = {
  args: {
    children: "Active",
    variant: "success",
    dot: true,
  },
};

export const WithDotVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="standard" dot>
        Standard
      </Badge>
      <Badge variant="success" dot>
        Success
      </Badge>
      <Badge variant="warning" dot>
        Warning
      </Badge>
      <Badge variant="error" dot>
        Error
      </Badge>
      <Badge variant="information" dot>
        Information
      </Badge>
    </div>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="standard">Standard</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="information">Information</Badge>
    </div>
  ),
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// Status Badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Active:</span>
        <Badge variant="success" dot>
          Active
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Pending:</span>
        <Badge variant="warning" dot>
          Pending
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Error:</span>
        <Badge variant="error" dot>
          Failed
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm w-20">Information:</span>
        <Badge variant="information" dot>
          Processing
        </Badge>
      </div>
    </div>
  ),
};

// Numeric Badges
export const NumericBadges: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="error">5</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge variant="information">12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Pending</span>
        <Badge variant="warning">3</Badge>
      </div>
    </div>
  ),
};

// Real-World Examples
export const UserRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">John Doe</span>
        <Badge variant="information" size="sm">
          Admin
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Jane Smith</span>
        <Badge variant="success" size="sm">
          Editor
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Bob Johnson</span>
        <Badge variant="standard" size="sm">
          Viewer
        </Badge>
      </div>
    </div>
  ),
};

export const OrderStatus: Story = {
  render: () => (
    <div className="p-4 flex flex-col gap-3 max-w-sm">
      <div className="flex justify-between items-center">
        <span className="font-medium">Order #1234</span>
        <Badge variant="success" dot>
          Delivered
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Order #1235</span>
        <Badge variant="information" dot>
          Shipping
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Order #1236</span>
        <Badge variant="warning" dot>
          Processing
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Order #1237</span>
        <Badge variant="error" dot>
          Cancelled
        </Badge>
      </div>
    </div>
  ),
};

export const ProductCategories: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="standard">Electronics</Badge>
      <Badge variant="standard">Clothing</Badge>
      <Badge variant="standard">Books</Badge>
      <Badge variant="standard">Home & Garden</Badge>
      <Badge variant="standard">Sports</Badge>
      <Badge variant="standard">Toys</Badge>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-2">
        <span>🔔</span>
        <Badge variant="error">9</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>✉️</span>
        <Badge variant="information">24</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>🛒</span>
        <Badge variant="success">3</Badge>
      </div>
    </div>
  ),
};
