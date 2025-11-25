import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge Component", () => {
  describe("Rendering", () => {
    it("Renders Badge With Text", () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("Renders Badge With Custom Class Name", () => {
      render(<Badge className="custom-badge">Badge</Badge>);
      const badge = screen.getByText("Badge");
      expect(badge).toHaveClass("custom-badge");
    });
  });

  describe("Variants", () => {
    it("Renders Default Variant By Default", () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText("Default");
      // Tailwind v4 Uses CSS Variables With "var()" Syntax
      expect(badge).toHaveClass("bg-[var(--color-gray-100)]");
      expect(badge).toHaveClass("text-[var(--color-gray-800)]");
    });

    it("Renders Standard Variant Correctly", () => {
      render(<Badge variant="standard">Standard</Badge>);
      const badge = screen.getByText("Standard");
      // Standard Variant Still Uses Gray (Default Behavior)
      expect(badge).toHaveClass("bg-[var(--color-gray-100)]");
    });

    it("Renders Success Variant Correctly", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass("bg-[var(--color-green-100)]");
      expect(badge).toHaveClass("text-[var(--color-green-800)]");
    });

    it("Renders Warning Variant Correctly", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText("Warning");
      expect(badge).toHaveClass("bg-[var(--color-yellow-100)]");
      expect(badge).toHaveClass("text-[var(--color-yellow-800)]");
    });

    it("Renders Error Variant Correctly", () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText("Error");
      expect(badge).toHaveClass("bg-[var(--color-red-100)]");
      expect(badge).toHaveClass("text-[var(--color-red-800)]");
    });

    it("Renders Information Variant Correctly", () => {
      render(<Badge variant="information">Information</Badge>);
      const badge = screen.getByText("Information");
      // Information Uses Blue Color
      expect(badge).toHaveClass("bg-[var(--color-blue-100)]");
      expect(badge).toHaveClass("text-[var(--color-blue-800)]");
    });
  });

  describe("Sizes", () => {
    it("Renders Medium Size By Default", () => {
      render(<Badge>Medium</Badge>);
      const badge = screen.getByText("Medium");
      // Default Size : "text-sm" (Not "text-xs")
      expect(badge).toHaveClass("px-2.5", "py-0.5", "text-sm");
    });

    it("Renders Small Size Correctly", () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText("Small");
      expect(badge).toHaveClass("px-2", "py-0.5", "text-xs");
    });

    it("Renders Large Size Correctly", () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText("Large");
      // Large Size Uses "text-base" (Not "text-sm")
      expect(badge).toHaveClass("px-3", "py-1", "text-base");
    });
  });

  describe("Dot Indicator", () => {
    it("Does Not Show Dot By Default", () => {
      const { container } = render(<Badge>No Dot</Badge>);
      // Should Not Find A Dot Element When "dot" Property is "False"
      const badge = container.querySelector("span");
      expect(badge?.children.length).toBe(0);
    });

    it("Shows Dot When 'dot' Property is True", () => {
      const { container } = render(<Badge dot>With Dot</Badge>);
      const badge = container.querySelector("span");
      // Badge With Dot Should Have Child Elements
      expect(badge?.children.length).toBeGreaterThan(0);
    });

    it("Applies Correct Styling To Badge With Dot", () => {
      render(
        <Badge variant="success" dot>
          Success
        </Badge>
      );
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass("bg-[var(--color-green-100)]");
    });
  });

  describe("Border Styles", () => {
    it("Has Rounded Corners", () => {
      render(<Badge>Rounded</Badge>);
      const badge = screen.getByText("Rounded");
      expect(badge).toHaveClass("rounded-full");
    });

    it("Has 'inline-flex' Display", () => {
      render(<Badge>Inline</Badge>);
      const badge = screen.getByText("Inline");
      expect(badge).toHaveClass("inline-flex");
    });

    it("Has Centered Items", () => {
      render(<Badge>Centered</Badge>);
      const badge = screen.getByText("Centered");
      expect(badge).toHaveClass("items-center");
    });
  });

  describe("Typography", () => {
    it("Has Medium Font Weight", () => {
      render(<Badge>Text</Badge>);
      const badge = screen.getByText("Text");
      expect(badge).toHaveClass("font-medium");
    });

    it("Has Appropriate Gap Between Elements", () => {
      render(<Badge>Gap</Badge>);
      const badge = screen.getByText("Gap");
      // Badge Has Gap Utility Class
      expect(badge.className).toMatch(/gap-/);
    });
  });

  describe("Content", () => {
    it("Renders Numeric Content", () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("Renders Text Content", () => {
      render(<Badge>Status: Active</Badge>);
      expect(screen.getByText("Status: Active")).toBeInTheDocument();
    });

    it("Renders With React Elements", () => {
      render(
        <Badge>
          <span>Complex</span> <strong>Content</strong>
        </Badge>
      );
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("Supports 'aria-label'", () => {
      render(<Badge aria-label="Notifications Count">5</Badge>);
      const badge = screen.getByLabelText("Notifications Count");
      expect(badge).toBeInTheDocument();
    });

    it("Supports 'role' Attribute", () => {
      render(<Badge role="status">Active</Badge>);
      const badge = screen.getByRole("status");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Styling Combinations", () => {
    it("Combines Variant & Size Correctly", () => {
      render(
        <Badge variant="standard" size="lg">
          Large Standard
        </Badge>
      );
      const badge = screen.getByText("Large Standard");
      expect(badge).toHaveClass("bg-[var(--color-gray-100)]");
      expect(badge).toHaveClass("px-3", "py-1", "text-base");
    });

    it("Combines Variant, Size & Dot correctly", () => {
      render(
        <Badge variant="success" size="sm" dot>
          Small Success
        </Badge>
      );
      const badge = screen.getByText("Small Success");
      expect(badge).toHaveClass("bg-[var(--color-green-100)]");
      expect(badge).toHaveClass("text-[var(--color-green-800)]");
      expect(badge).toHaveClass("px-2", "py-0.5", "text-xs");
    });
  });

  describe("Dark Mode Support", () => {
    it("Includes Dark Mode Classes", () => {
      render(<Badge>Dark Mode</Badge>);
      const badge = screen.getByText("Dark Mode");
      // Check If Dark Mode Classes Are Present
      expect(badge.className).toContain("dark:");
    });
  });
});
