import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import React, { useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { searchReducer, setSearchStringDebounced } from "./index";

const store = configureStore({
  reducer: searchReducer,
});

type ApplicationState = ReturnType<typeof store.getState>;

const Component = () => {
  const searchString = useSelector(
    (store: ApplicationState) => store.searchString,
  );
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSetToken = () =>
    dispatch(setSearchStringDebounced(inputRef.current?.value, 0));

  return (
    <div>
      <input ref={inputRef} placeholder="type to search" />
      <button onClick={handleSetToken}>Search</button>
      <p>Searching for: {searchString}</p>
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

  const input: HTMLInputElement = screen.getByPlaceholderText("type to search");
  const button: HTMLButtonElement = screen.getByText("Search");
  const paragraph: HTMLParagraphElement = screen.getByText("Searching for:");

  fireEvent.change(input, { target: { value: "abcd" } });
  fireEvent.click(button);
  expect(paragraph.innerHTML).toEqual("Searching for: abcd");
});
