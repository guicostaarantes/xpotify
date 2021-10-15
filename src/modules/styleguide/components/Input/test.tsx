import { fireEvent, render, screen } from "@testing-library/react";
import React, { ChangeEvent, useState } from "react";

import Input from "./index";

it("should render a uncontrolled input", () => {
  render(<Input placeholder="test input" />);

  const input: HTMLInputElement = screen.getByPlaceholderText("test input");
  fireEvent.change(input, { target: { value: "abcd" } });
  expect(input.value).toEqual("abcd");
});

it("should render a controlled input", () => {
  const Component = () => {
    const [value, setValue] = useState("");

    return (
      <div>
        <Input
          placeholder="test input"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
          value={value}
        />
        <button onClick={() => setValue("")}>Reset</button>
      </div>
    );
  };

  render(<Component />);

  const input: HTMLInputElement = screen.getByPlaceholderText("test input");
  const resetButton: HTMLButtonElement = screen.getByText("Reset");

  fireEvent.change(input, { target: { value: "abcd" } });
  expect(input.value).toEqual("abcd");

  fireEvent.click(resetButton);
  expect(input.value).toEqual("");
});
