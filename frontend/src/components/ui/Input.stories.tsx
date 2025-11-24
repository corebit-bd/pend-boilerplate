import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Input Type",
    },
    disabled: {
      control: "boolean",
      description: "Disabled State",
    },
    readOnly: {
      control: "boolean",
      description: "Read Only State",
    },
    required: {
      control: "boolean",
      description: "Required Field",
    },
    fullWidth: {
      control: "boolean",
      description: "Full Width",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input
export const Default: Story = {
  args: {
    placeholder: "Enter Text ... .. .",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    helperText: "Choose A Unique Username",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    error: "Please Enter A Valid Email Address",
  },
};

// Input Types
export const TextInput: Story = {
  args: {
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
  },
};

export const EmailInput: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const PasswordInput: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "25",
  },
};

// States
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot Edit",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read Only",
    value: "This Is Read-Only",
    readOnly: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    placeholder: "This Field Is Required",
    required: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "Spans Full Width",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

// With Icons
export const WithStartIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search ... .. .",
    startIcon: "🔍", // TODO : <Icon icon="search" />
  },
};

export const WithEndIcon: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    endIcon: "✅", // TODO : <Icon icon="check" />
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Username",
    placeholder: "johndoe",
    startIcon: "👤", // TODO : <Icon icon="user" />
    endIcon: "✅", // TODO : <Icon icon="check" />
  },
};

// Form Examples
export const LoginForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        startIcon="👤" // TODO : <Icon icon="user" />
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        startIcon={<span>🔒</span>}
      />
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Valid Input"
        placeholder="Correct Format"
        helperText="Looks Good!"
      />
      <Input
        label="Invalid Input"
        placeholder="Wrong Format"
        error="This Field Is Required"
      />
      <Input
        label="Warning Input"
        placeholder="Check This"
        helperText="Please Verify This Information"
      />
    </div>
  ),
};

export const AllInputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input label="Text" type="text" placeholder="Text Input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Number" type="number" placeholder="123" />
      <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
    </div>
  ),
};

// Real-World Examples
export const ContactForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input label="Full Name" placeholder="John Doe" required />
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        helperText="Optional"
      />
      <Input label="Company" placeholder="Acme Inc." />
    </div>
  ),
};

export const PaymentForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        startIcon={<span>💳</span>}
      />
      <div className="flex gap-4">
        <Input label="Expiry" placeholder="MM/YY" className="flex-1" />
        <Input
          label="CVV"
          placeholder="123"
          type="password"
          className="flex-1"
        />
      </div>
      <Input label="Card Holder Name" placeholder="John Doe" />
    </div>
  ),
};
