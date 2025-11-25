import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Icon } from "../Icon";

// Icon Names Based On Some Example Implementations
const mockIconNames = [
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
] as const;

describe("Icon Component", () => {
  describe("Rendering", () => {
    it("Renders Icon Element", () => {
      const { container } = render(<Icon icon="check" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toBeInTheDocument();
    });

    it("Renders With Custom ClassName", () => {
      const { container } = render(
        <Icon icon="check" className="custom-icon" />
      );
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("custom-icon");
    });

    it("Renders Different Icon Types", () => {
      mockIconNames.forEach((iconName) => {
        const { container } = render(<Icon icon={iconName} />);
        const iconElement = container.querySelector("span");
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveTextContent(iconName);
      });
    });
  });

  describe("Sizes", () => {
    it("Renders Small Size Correctly", () => {
      const { container } = render(<Icon icon="check" size="sm" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("w-4", "h-4");
    });

    it("Renders Medium Size By Default", () => {
      const { container } = render(<Icon icon="check" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("w-5", "h-5");
    });

    it("Renders Large Size Correctly", () => {
      const { container } = render(<Icon icon="check" size="lg" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("w-6", "h-6");
    });

    it("Renders Extra Large Size Correctly", () => {
      const { container } = render(<Icon icon="check" size="xl" />);
      const iconElement = container.querySelector("span");
      // XL Size : w-7 h-7 (Not w-8 h-8)
      expect(iconElement).toHaveClass("w-7", "h-7");
    });
  });

  describe("Base Styles", () => {
    it("Has 'inline-flex' Display", () => {
      const { container } = render(<Icon icon="check" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("inline-flex");
    });

    it("Has Centered Items", () => {
      const { container } = render(<Icon icon="check" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("items-center", "justify-center");
    });

    it("Has 'shrink-0' Class", () => {
      const { container } = render(<Icon icon="check" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("shrink-0");
    });
  });

  describe("Accessibility", () => {
    it("Has Appropriate 'aria-hidden' By Default", () => {
      const { container } = render(<Icon icon="check" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveAttribute("aria-hidden", "true");
    });

    it("Maintains 'aria-hidden' Even With 'aria-label'", () => {
      const { container } = render(
        <Icon icon="check" aria-label="Success Indicator" />
      );
      const iconElement = container.querySelector("span");
      // Your Implementation Doesn't Accept 'aria-label' Property, 'aria-hidden' Remains 'true'
      expect(iconElement).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Styling Combinations", () => {
    it("Combines Size With Custom ClassName", () => {
      const { container } = render(
        <Icon icon="check" size="sm" className="ml-2" />
      );
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass("w-4", "h-4", "ml-2");
    });

    it("Preserves All Base Classes With Custom ClassName", () => {
      const { container } = render(
        <Icon icon="check" className="text-blue-600" />
      );
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "text-blue-600"
      );
    });
  });

  describe("Use Cases", () => {
    it("Can Be Used In Buttons", () => {
      render(
        <button>
          <Icon icon="check" size="sm" className="mr-2" />
          Confirm
        </button>
      );
      expect(screen.getByText("Confirm")).toBeInTheDocument();
      expect(screen.getByText("check")).toBeInTheDocument();
    });

    it("Can Be Used As Standalone Decorative Icon", () => {
      const { container } = render(
        <div>
          <Icon icon="user" size="xl" />
        </div>
      );
      const iconElement = container.querySelector("span");
      expect(iconElement).toHaveAttribute("aria-hidden", "true");
    });

    it("Displays Icon Name As Text Content", () => {
      render(<Icon icon="check" />);
      expect(screen.getByText("check")).toBeInTheDocument();
    });

    it("Can Be Used With Wrapper For Semantic Meaning", () => {
      render(
        <div>
          <Icon icon="check" />
          <span>Account Verified</span>
        </div>
      );
      // Icon is Decorative, Semantic Meaning comes from Adjacent Text
      expect(screen.getByText("check")).toBeInTheDocument();
      expect(screen.getByText("Account Verified")).toBeInTheDocument();
    });
  });

  describe("Icon Library Coverage", () => {
    it("Supports Common Navigation Icons", () => {
      const navIcons = ["home", "menu", "settings", "search"] as const;
      navIcons.forEach((icon) => {
        const { container } = render(<Icon icon={icon} />);
        const iconElement = container.querySelector("span");
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveTextContent(icon);
      });
    });

    it("Supports Common Action Icons", () => {
      const actionIcons = [
        "check",
        "close",
        "arrow-right",
        "arrow-left",
      ] as const;
      actionIcons.forEach((icon) => {
        const { container } = render(<Icon icon={icon} />);
        const iconElement = container.querySelector("span");
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveTextContent(icon);
      });
    });
  });

  describe("Edge Cases", () => {
    it("Handles Empty ClassName Gracefully", () => {
      const { container } = render(<Icon icon="check" className="" />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toBeInTheDocument();
    });

    it("Handles 'undefined' ClassName Gracefully", () => {
      const { container } = render(<Icon icon="check" className={undefined} />);
      const iconElement = container.querySelector("span");
      expect(iconElement).toBeInTheDocument();
    });

    it("Renders With Hyphenated Icon Names", () => {
      render(<Icon icon="arrow-right" />);
      expect(screen.getByText("arrow-right")).toBeInTheDocument();
    });
  });

  describe("Icon Properties", () => {
    it("Passes 'icon' Property Correctly", () => {
      render(<Icon icon="settings" />);
      expect(screen.getByText("settings")).toBeInTheDocument();
    });

    it("Renders Different Icons With Same Size", () => {
      const { container: container1 } = render(<Icon icon="check" size="lg" />);
      const { container: container2 } = render(<Icon icon="close" size="lg" />);

      const icon1 = container1.querySelector("span");
      const icon2 = container2.querySelector("span");

      expect(icon1).toHaveClass("w-6", "h-6");
      expect(icon2).toHaveClass("w-6", "h-6");
    });
  });
});
