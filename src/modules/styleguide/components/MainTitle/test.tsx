import { render, screen } from "@testing-library/react";
import React from "react";

import MainTitle from "./index";

it("should render a h1", () => {
  render(<MainTitle>Test</MainTitle>);

  const title = screen.getByText("Test");
  const h1 = screen.getByRole("heading", { level: 1 });

  expect(title).toEqual(h1);
});
