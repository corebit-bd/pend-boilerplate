import "@testing-library/jest-dom";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner Component", () => {
  describe("Rendering", () => {
    it("Renders Spinner Element", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("Renders With Custom Class Name", () => {
      const { container } = render(<Spinner className="custom-spinner" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("custom-spinner");
    });

    it("Renders With Wrapper Div", () => {
      const { container } = render(<Spinner />);
      const wrapper = container.querySelector('div[role="status"]');
      expect(wrapper).toBeInTheDocument();
    });

    it("Renders Screen Reader Text By Default", () => {
      render(<Spinner />);
      expect(screen.getByText("Loading")).toBeInTheDocument();
    });
  });

  describe("Sizes", () => {
    it("Renders Medium Size By Default", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-5", "w-5");
    });

    it("Renders Extra Small Size Correctly", () => {
      const { container } = render(<Spinner size="xs" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-3", "w-3");
    });

    it("Renders Small Size Correctly", () => {
      const { container } = render(<Spinner size="sm" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-4", "w-4");
    });

    it("Renders Large Size Correctly", () => {
      const { container } = render(<Spinner size="lg" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-6", "w-6");
    });

    it("Renders Extra Large Size Correctly", () => {
      const { container } = render(<Spinner size="xl" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-7", "w-7");
    });

    it("Renders 2 Times Extra Large Size Correctly", () => {
      const { container } = render(<Spinner size="2xl" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-8", "w-8");
    });
  });

  describe("Animation", () => {
    it("Has Animation Class Applied", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("animate-spin");
    });
  });

  describe("SVG Structure", () => {
    it("Has Correct 'viewBox'", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });

    it("Has 'fill' Set To 'none'", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("fill", "none");
    });

    it("Has 'xmlns' Attribute", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    });

    it("Contains Circle Element", () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector("circle");
      expect(circle).toBeInTheDocument();
    });

    it("Contains Circle Which Has Correct Attributes", () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector("circle");
      expect(circle).toHaveAttribute("cx", "12");
      expect(circle).toHaveAttribute("cy", "12");
      expect(circle).toHaveAttribute("r", "10");
      expect(circle).toHaveAttribute("stroke", "currentColor");
      expect(circle).toHaveAttribute("stroke-width", "4");
    });

    it("Contains Circle Which Has 'opacity' Class", () => {
      const { container } = render(<Spinner />);
      const circle = container.querySelector("circle");
      expect(circle).toHaveClass("opacity-25");
    });

    it("Contains Path Element", () => {
      const { container } = render(<Spinner />);
      const path = container.querySelector("path");
      expect(path).toBeInTheDocument();
    });

    it("Contains Path Which Has Correct Attributes", () => {
      const { container } = render(<Spinner />);
      const path = container.querySelector("path");
      expect(path).toHaveAttribute("fill", "currentColor");
      expect(path).toHaveAttribute("d");
    });

    it("Contains Path Which Has 'opacity' Class", () => {
      const { container } = render(<Spinner />);
      const path = container.querySelector("path");
      expect(path).toHaveClass("opacity-75");
    });
  });

  describe("Accessibility", () => {
    it("Contains Wrapper Which Has Role of 'status'", () => {
      const { container } = render(<Spinner />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveAttribute("role", "status");
    });

    it("Contains SVG Which Has 'aria-hidden' Attribute", () => {
      const { container } = render(<Spinner />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("aria-hidden", "true");
    });

    it("Supports Custom Label Text", () => {
      render(<Spinner label="Processing Request" />);
      expect(screen.getByText("Processing Request")).toBeInTheDocument();
    });

    it("Contains Screen Reader Text Which Has 'sr-only' Class", () => {
      const { container } = render(<Spinner />);
      const srText = container.querySelector(".sr-only");
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent("Loading");
    });

    it("Is Properly Announced To Screen Readers With Default Label", () => {
      render(<Spinner />);
      expect(screen.getByText("Loading")).toBeInTheDocument();
    });
  });

  describe("Wrapper Styles", () => {
    it("Has 'inline-flex' Display", () => {
      const { container } = render(<Spinner />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("inline-flex");
    });

    it("Has 'items-center' Class", () => {
      const { container } = render(<Spinner />);
      const wrapper = container.querySelector("div");
      expect(wrapper).toHaveClass("items-center");
    });
  });

  describe("Color Inheritance", () => {
    it("Uses 'currentColor' For Stroke and Fill", () => {
      const { container } = render(<Spinner className="text-blue-600" />);
      const circle = container.querySelector("circle");
      const path = container.querySelector("path");

      expect(circle).toHaveAttribute("stroke", "currentColor");
      expect(path).toHaveAttribute("fill", "currentColor");
    });
  });

  describe("Styling Combinations", () => {
    it("Combines Size & Custom Class Name Correctly", () => {
      const { container } = render(
        <Spinner size="lg" className="text-green-600" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-6", "w-6", "text-green-600");
    });

    it("Preserves Custom Class Name With Size", () => {
      const { container } = render(
        <Spinner size="sm" className="mx-auto text-red-600" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("h-4", "w-4", "mx-auto", "text-red-600");
    });

    it("Applies Animation With Custom Classes", () => {
      const { container } = render(<Spinner className="text-purple-500" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("animate-spin", "text-purple-500");
    });
  });

  describe("Use Cases", () => {
    it("Can Be Used As Button Loading Indicator", () => {
      render(
        <button disabled>
          <Spinner size="sm" className="mr-2" />
          Loading ... .. .
        </button>
      );
      expect(screen.getByText("Loading")).toBeInTheDocument();
      expect(screen.getByText("Loading ... .. .")).toBeInTheDocument();
    });

    it("Can Be Used As Page Loading Indicator", () => {
      const { container } = render(
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" />
        </div>
      );
      const spinner = container.querySelector("svg");
      expect(spinner).toHaveClass("h-7", "w-7");
    });

    it("Can Be Used With Custom Color", () => {
      const { container } = render(
        <Spinner size="lg" className="text-blue-500" />
      );
      const svg = container.querySelector("svg");
      expect(svg).toHaveClass("text-blue-500");
    });

    it("Can Display Custom Loading Message", () => {
      render(<Spinner label="Uploading Files ... .. ." />);
      expect(screen.getByText("Uploading Files ... .. .")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("Handles Empty Class Name Gracefully", () => {
      const { container } = render(<Spinner className="" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("Handles 'undefined' Class Name Gracefully", () => {
      const { container } = render(<Spinner className={undefined} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("Handles Empty Label Text", () => {
      render(<Spinner label="" />);
      const srText = screen.queryByText("Loading");
      expect(srText).not.toBeInTheDocument();
    });
  });

  describe("ForwardReference", () => {
    it("Forwards Reference To Wrapper Div", () => {
      const reference = React.createRef<HTMLDivElement>();
      render(<Spinner ref={reference} />);
      expect(reference.current).toBeInstanceOf(HTMLDivElement);
      expect(reference.current).toHaveAttribute("role", "status");
    });
  });
});
