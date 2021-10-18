import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useDispatch } from "react-redux";

import { selectTrack } from "#/shared/store/player";

import TrackList from "./index";

jest.mock("react-redux");
jest.mock("#/shared/store/player");

const tracks = [
  {
    id: "123",
    track_number: 1,
    name: "Track 1",
    duration_ms: 123450,
    preview_url: "https://api.spotify.com/track-1.mp3",
  },
  {
    id: "456",
    track_number: 2,
    name: "Track 2",
    duration_ms: 123450,
    preview_url: "https://api.spotify.com/track-2.mp3",
  },
  {
    id: "789",
    track_number: 3,
    name: "Track 3",
    duration_ms: 123450,
    preview_url: "https://api.spotify.com/track-3.mp3",
  },
];

describe("TrackList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should play track on click", () => {
    const mockSelectTrack = jest.fn((track) => ({
      type: "MOCK_SELECT_TRACK",
      payload: track,
    }));
    const mockDispatch = jest.fn();

    (selectTrack as jest.Mock).mockImplementation(mockSelectTrack);
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(<TrackList tracks={tracks} />);

    const track1: HTMLDivElement = screen.getByText("Track 1");
    const track2: HTMLDivElement = screen.getByText("Track 2");
    const track3: HTMLDivElement = screen.getByText("Track 3");

    fireEvent.click(track1);
    fireEvent.click(track2);
    fireEvent.click(track3);

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: "MOCK_SELECT_TRACK",
      payload: {
        id: "123",
        track_number: 1,
        name: "Track 1",
        duration_ms: 123450,
        preview_url: "https://api.spotify.com/track-1.mp3",
      },
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: "MOCK_SELECT_TRACK",
      payload: {
        id: "456",
        track_number: 2,
        name: "Track 2",
        duration_ms: 123450,
        preview_url: "https://api.spotify.com/track-2.mp3",
      },
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: "MOCK_SELECT_TRACK",
      payload: {
        id: "789",
        track_number: 3,
        name: "Track 3",
        duration_ms: 123450,
        preview_url: "https://api.spotify.com/track-3.mp3",
      },
    });
  });
});
