import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("Renders Button with Text", () => {
      render(<Button>Click Me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("Renders Button with Custom ClassName", () => {
      render(<Button className="custom-class">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("Renders as Disabled when 'disabled' Property is 'True'", () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("Variants", () => {
    it("Renders Primary Variant By Default", () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole("button");
      // Tailwind v4 uses CSS Variables Syntax
      expect(button).toHaveClass("bg-(--color-blue-600)");
    });

    it("Renders Secondary Variant Correctly", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      // Secondary uses Purple Color
      expect(button).toHaveClass("bg-(--color-purple-600)");
    });

    it("Renders Outline Variant Correctly", () => {
      render(<Button variant="outline">Outline</Button>);
      const button = screen.getByRole("button");
      // Outline has Border & Transparent Background
      expect(button).toHaveClass("border-(--color-gray-300)");
      expect(button).toHaveClass("bg-transparent");
    });

    it("Renders Tertiary Variant Correctly", () => {
      render(<Button variant="tertiary">Tertiary</Button>);
      const button = screen.getByRole("button");
      // Tertiary has a Transparent Background
      expect(button).toHaveClass("bg-transparent");
      expect(button).toHaveClass("hover:bg-(--color-gray-100)");
    });

    it("Renders Danger Variant Correctly", () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole("button");
      // Danger uses Red Color
      expect(button).toHaveClass("bg-(--color-red-600)");
    });
  });

  describe("Sizes", () => {
    it("Renders Medium Size By Default", () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
    });

    it("Renders Small Size Correctly", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9");
    });

    it("Renders Large Size Correctly", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-11");
    });
  });

  describe("Loading State", () => {
    it("Shows Spinner When Loading", () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole("button");
      // Check for Spinner SVG Element
      const spinner = button.querySelector("svg");
      expect(spinner).toBeInTheDocument();
    });

    it("Disables Button when Loading", () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("Maintains Button Content when Loading", () => {
      render(<Button isLoading>Click me</Button>);
      const button = screen.getByRole("button");
      // Button should be Present & Disabled
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
      // Spinner should be Present
      const spinner = button.querySelector("svg");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("Calls 'onClick' when Clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("Does Not Call 'onClick' When Disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disabled>
          Click Me
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("Does Not Call 'onClick' When Loading", () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} isLoading>
          Click Me
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Button Types", () => {
    it("Renders as Button Type By Default", () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("Renders as Submit Type when Specified", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("Renders as Reset Type when Specified", () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
    });
  });

  describe("Accessibility", () => {
    it("Supports 'aria-label'", () => {
      render(<Button aria-label="Close Dialog">X</Button>);
      expect(screen.getByLabelText("Close Dialog")).toBeInTheDocument();
    });

    it("Supports 'aria-describedby'", () => {
      render(
        <>
          <Button aria-describedby="button-description">Action</Button>
          <div id="button-description">This performs an action</div>
        </>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "button-description");
    });
  });
});
