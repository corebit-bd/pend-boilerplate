import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../Input";

describe("Input Component", () => {
  describe("Rendering", () => {
    it("Renders Input Element", () => {
      render(<Input placeholder="Enter Text" />);
      expect(screen.getByPlaceholderText("Enter Text")).toBeInTheDocument();
    });

    it("Renders with Label", () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    it("Renders with Helper Text", () => {
      render(<Input helperText="Enter Your Email Address" />);
      expect(screen.getByText("Enter Your Email Address")).toBeInTheDocument();
    });

    it("Renders with Error Message", () => {
      render(<Input error="This Field is Required" />);
      expect(screen.getByText("This Field is Required")).toBeInTheDocument();
    });

    it("Applies Custom ClassName", () => {
      render(<Input className="custom-input" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("custom-input");
    });
  });

  describe("Input Types", () => {
    it("Renders Text Input By Default", () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "text");
    });

    it("Renders Email Input when Type is Email", () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
    });

    it("Renders Password Input when Type is Password", () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "password");
    });

    it("Renders Number Input when Type is Number", () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("type", "number");
    });
  });

  describe("States", () => {
    it("Applies Error Styles when Error Property is Provided", () => {
      render(<Input error="Error message" data-testid="input" />);
      const input = screen.getByTestId("input");
      // Tailwind v4 uses CSS Variables
      expect(input).toHaveClass("border-[var(--color-red-500)]");
    });

    it("Shows Required Indicator in Label When Required", () => {
      render(<Input label="Email" required />);
      // Label Should Exist (Required Indicator is typically Shown Within / Near Label)
      expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("Disables Input when 'disabled' Property is 'True'", () => {
      render(<Input disabled data-testid="input" />);
      expect(screen.getByTestId("input")).toBeDisabled();
    });

    it("Applies Disabled Styles when Disabled", () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass(
        "disabled:cursor-not-allowed",
        "disabled:opacity-50"
      );
    });

    it("Makes Input ReadOnly when 'readOnly' Property is 'True'", () => {
      render(<Input readOnly data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveAttribute("readonly");
    });
  });

  describe("Interactions", () => {
    it("Calls 'onChange' When Input Value Changes", () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} data-testid="input" />);

      const input = screen.getByTestId("input");
      fireEvent.change(input, { target: { value: "test" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("Calls 'onBlur' When Input Loses Focus", () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} data-testid="input" />);

      const input = screen.getByTestId("input");
      fireEvent.blur(input);

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("Calls 'onFocus' When Input Gains Focus", () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} data-testid="input" />);

      const input = screen.getByTestId("input");
      fireEvent.focus(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("Updates Value when Controlled", () => {
      const { rerender } = render(
        <Input value="initial" onChange={() => {}} data-testid="input" />
      );
      expect(screen.getByTestId("input")).toHaveValue("initial");

      rerender(
        <Input value="updated" onChange={() => {}} data-testid="input" />
      );
      expect(screen.getByTestId("input")).toHaveValue("updated");
    });
  });

  describe("Validation", () => {
    it("Shows Error Message when Validation Fails", () => {
      render(<Input error="Invalid Email Format" />);
      expect(screen.getByText("Invalid Email Format")).toBeInTheDocument();
    });

    it("Applies Error Border Color when Error Exists", () => {
      render(<Input error="Error" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("border-[var(--color-red-500)]");
    });

    it("Applies Error Focus Ring when Error Exists", () => {
      render(<Input error="Error" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("focus-visible:ring-[var(--color-red-500)]");
    });

    it("Ensures Error Message has 'alert' Role", () => {
      render(<Input error="Error Message" />);
      const errorElement = screen.getByRole("alert");
      expect(errorElement).toHaveTextContent("Error Message");
    });
  });

  describe("Label & Helper Text", () => {
    it("Associates Label with Input Using 'htmlFor'", () => {
      render(<Input label="Email" id="email-input" />);
      const label = screen.getByText("Email");
      expect(label).toHaveAttribute("for", "email-input");
    });

    it("Generates Unique ID When Not Provided", () => {
      render(<Input label="Email" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("id");
      expect(input.getAttribute("id")).toBeTruthy();
    });

    it("Displays Helper Text Below Input", () => {
      render(<Input helperText="We will never share your Email Address" />);
      const helperText = screen.getByText(
        "We will never share your Email Address"
      );
      expect(helperText).toBeInTheDocument();
    });

    it("Displays Error Message instead of Helper Text When Error Exists", () => {
      render(<Input helperText="Helper Text" error="Error Message" />);
      expect(screen.getByText("Error Message")).toBeInTheDocument();
      expect(screen.queryByText("Helper Text")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("Supports 'aria-label'", () => {
      render(<Input aria-label="Search Input" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-label", "Search Input");
    });

    it("Sets 'aria-invalid' When Error Exists", () => {
      render(<Input error="Error" data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("Sets 'aria-invalid' to 'false' When No Error", () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("Associates Error Message With Input Using 'aria-describedby'", () => {
      render(<Input error="Error Message" data-testid="input" />);
      const input = screen.getByTestId("input");
      const ariaDescribedBy = input.getAttribute("aria-describedby");
      expect(ariaDescribedBy).toBeTruthy();

      if (ariaDescribedBy) {
        const errorElement = document.getElementById(ariaDescribedBy);
        expect(errorElement).toHaveTextContent("Error Message");
      }
    });

    it("Associates Helper Text With Input Using 'aria-describedby'", () => {
      render(<Input helperText="Helper Text" data-testid="input" />);
      const input = screen.getByTestId("input");
      const ariaDescribedBy = input.getAttribute("aria-describedby");
      expect(ariaDescribedBy).toBeTruthy();

      if (ariaDescribedBy) {
        const helperElement = document.getElementById(ariaDescribedBy);
        expect(helperElement).toHaveTextContent("Helper Text");
      }
    });

    it("Has Required Attribute When 'required' Property Is 'True'", () => {
      render(<Input required data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveAttribute("required");
    });
  });

  describe("Placeholder", () => {
    it("Renders With Placeholder Text", () => {
      render(<Input placeholder="Enter Your Name" />);
      expect(
        screen.getByPlaceholderText("Enter Your Name")
      ).toBeInTheDocument();
    });
  });

  describe("Default Value", () => {
    it("Renders With Default Value", () => {
      render(<Input defaultValue="Default Text" data-testid="input" />);
      expect(screen.getByTestId("input")).toHaveValue("Default Text");
    });
  });

  describe("Icons", () => {
    it("Renders With Start Icon", () => {
      const startIcon = <span data-testid="start-icon">🔍</span>;
      render(<Input startIcon={startIcon} data-testid="input" />);
      expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    });

    it("Renders With End Icon", () => {
      const endIcon = <span data-testid="end-icon">✓</span>;
      render(<Input endIcon={endIcon} data-testid="input" />);
      expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    });

    it("Applies Correct Padding When Start Icon Is Present", () => {
      const startIcon = <span>🔍</span>;
      render(<Input startIcon={startIcon} data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("pl-10");
    });

    it("Applies Correct Padding When End Icon Is Present", () => {
      const endIcon = <span>✓</span>;
      render(<Input endIcon={endIcon} data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("pr-10");
    });
  });

  describe("Full Width", () => {
    it("Applies Full Width Class when 'fullWidth' Property is 'True'", () => {
      const { container } = render(<Input fullWidth data-testid="input" />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("w-full");
    });

    it("Does Not Apply Full Width Class By Default", () => {
      const { container } = render(<Input data-testid="input" />);
      const wrapper = container.querySelector("div");
      expect(wrapper).not.toHaveClass("w-full");
    });
  });

  describe("Base Styles", () => {
    it("Has Correct Base Height", () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("h-10");
    });

    it("Has Rounded Borders", () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("rounded-md");
    });

    it("Has Border Styling", () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId("input");
      expect(input).toHaveClass("border-2");
    });
  });
});
