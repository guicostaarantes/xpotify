import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

import { historyReducer, visitAlbum } from "./index";

const store = configureStore({
  reducer: {
    history: historyReducer,
  },
});

type ApplicationState = ReturnType<typeof store.getState>;

const Component = () => {
  const latestVisitedAlbums = useSelector(
    (store: ApplicationState) => store.history.latestVisitedAlbums,
  );
  const dispatch = useDispatch();

  const handleVisitAlbum = (albumId: string) =>
    dispatch(
      visitAlbum({
        id: albumId,
        name: "",
        artists: [],
        images: [],
        tracks: { items: [] },
      }),
    );

  return (
    <div>
      <p>
        Latest visited albums:{" "}
        {latestVisitedAlbums.map((lva) => lva.id).join(",")}
      </p>
      <button onClick={() => handleVisitAlbum("1")}>Visit album 1</button>
      <button onClick={() => handleVisitAlbum("2")}>Visit album 2</button>
      <button onClick={() => handleVisitAlbum("3")}>Visit album 3</button>
      <button onClick={() => handleVisitAlbum("4")}>Visit album 4</button>
      <button onClick={() => handleVisitAlbum("5")}>Visit album 5</button>
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

it("should list last 4 albums ordered by time of access", () => {
  render(<Wrapper />);

  const paragraph: HTMLParagraphElement = screen.getByText(
    "Latest visited albums:",
  );
  const button1: HTMLButtonElement = screen.getByText("Visit album 1");
  const button2: HTMLButtonElement = screen.getByText("Visit album 2");
  const button3: HTMLButtonElement = screen.getByText("Visit album 3");
  const button4: HTMLButtonElement = screen.getByText("Visit album 4");
  const button5: HTMLButtonElement = screen.getByText("Visit album 5");

  fireEvent.click(button1);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 1");
  fireEvent.click(button2);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 2,1");
  fireEvent.click(button5);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 5,2,1");
  fireEvent.click(button1);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 1,5,2");
  fireEvent.click(button4);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 4,1,5,2");
  fireEvent.click(button3);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 3,4,1,5");
  fireEvent.click(button1);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 1,3,4,5");
  fireEvent.click(button2);
  expect(paragraph.innerHTML).toEqual("Latest visited albums: 2,1,3,4");
});
