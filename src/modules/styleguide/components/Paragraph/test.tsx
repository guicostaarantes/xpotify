import { render, screen } from "@testing-library/react";
import React from "react";

import Paragraph from "./index";

it("should render a paragraph", () => {
  render(<Paragraph>Test</Paragraph>);

  const p = screen.getByText("Test");

  expect(p).toBeInTheDocument();
});
