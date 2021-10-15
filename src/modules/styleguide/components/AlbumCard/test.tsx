import { render, screen } from "@testing-library/react";
import React from "react";

import AlbumCard from "./index";

it("should render image and two texts", () => {
  render(
    <AlbumCard
      src="image_source"
      primaryText="primary"
      secondaryText="secondary"
    />,
  );

  const img = screen.getByAltText("primary");
  const primary = screen.getByText("primary");
  const secondary = screen.getByText("secondary");

  expect(img).toBeInTheDocument();
  expect(primary).toBeInTheDocument();
  expect(secondary).toBeInTheDocument();
});
