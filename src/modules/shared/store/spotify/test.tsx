import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import React, { useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { setTokenDebounced, spotifyReducer } from "./index";

const store = configureStore({
  reducer: spotifyReducer,
});

type ApplicationState = ReturnType<typeof store.getState>;

const Component = () => {
  const token = useSelector((store: ApplicationState) => store.token);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetToken = () =>
    dispatch(setTokenDebounced(inputRef.current?.value, 0));

  return (
    <div>
      <input ref={inputRef} placeholder="insert token" />
      <button onClick={handleSetToken}>Set token</button>
      <p>The current token is {token}</p>
    </div>
  );
};

const Wrapper = () => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

it("should get and set token", () => {
  render(<Wrapper />);

  const input: HTMLInputElement = screen.getByPlaceholderText("insert token");
  const button: HTMLButtonElement = screen.getByText("Set token");
  const paragraph: HTMLParagraphElement = screen.getByText(
    "The current token is",
  );

  fireEvent.change(input, { target: { value: "1234" } });
  fireEvent.click(button);
  expect(paragraph.innerHTML).toEqual("The current token is 1234");
});
