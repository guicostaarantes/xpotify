import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { playerReducer, selectTrack } from "./index";

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

type ApplicationState = ReturnType<typeof store.getState>;

const Component = () => {
  const track = useSelector((store: ApplicationState) => store.player.track);
  const dispatch = useDispatch();

  const handleSetTrack = (trackId: string) =>
    dispatch(
      selectTrack({ id: trackId, name: "", duration_ms: 123, preview_url: "" }),
    );

  return (
    <div>
      <p>Playing track: {track?.id || ""}</p>
      <button onClick={() => handleSetTrack("1")}>Play track 1</button>
      <button onClick={() => handleSetTrack("2")}>Play track 2</button>
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

it("should change track", () => {
  render(<Wrapper />);

  const paragraph: HTMLParagraphElement = screen.getByText("Playing track:");
  const button1: HTMLButtonElement = screen.getByText("Play track 1");
  const button2: HTMLButtonElement = screen.getByText("Play track 2");

  fireEvent.click(button1);
  expect(paragraph.innerHTML).toEqual("Playing track: 1");
  fireEvent.click(button2);
  expect(paragraph.innerHTML).toEqual("Playing track: 2");
});

it("should not dispatch if select track is already active", () => {
  const mockDispatch = jest.fn();
  const mockGetState = () => ({
    player: {
      track: {
        id: "1",
      },
    },
  });

  selectTrack({ id: "1", name: "", duration_ms: 0, preview_url: "" })(
    mockDispatch,
    mockGetState,
  );
  expect(mockDispatch).toBeCalledTimes(0);

  selectTrack({ id: "2", name: "", duration_ms: 0, preview_url: "" })(
    mockDispatch,
    mockGetState,
  );
  expect(mockDispatch).toBeCalledTimes(1);
});
