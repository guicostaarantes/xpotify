import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

import useAlbum from "#/artist/hooks/useAlbum";

import AlbumPage from "./index";

jest.mock("react-redux");
jest.mock("react-router-dom", () => ({
  useParams: () => ({
    albumId: "1234",
  }),
  useHistory: () => ({
    goBack: () => 0,
  }),
}));
jest.mock("#/artist/hooks/useAlbum");

const albumData = {
  id: "1234",
  name: "Album name",
  artists: [
    {
      name: "Artist name",
    },
  ],
  images: [
    {
      url: "https://api.spotify.com/images/1234.jpg",
    },
  ],
  tracks: {
    items: [
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
    ],
  },
};

describe("Album page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading message", async () => {
    (useAlbum as jest.Mock).mockImplementation(() => ({
      status: "loading",
    }));

    render(<AlbumPage />);

    await waitFor(() => {
      const loading: HTMLDivElement = screen.getByText("Carregando...");

      expect(loading).toBeInTheDocument();
    });
  });

  it("should show fail message", async () => {
    (useAlbum as jest.Mock).mockImplementation(() => ({
      status: "fail",
    }));

    render(<AlbumPage />);

    await waitFor(() => {
      const fail: HTMLDivElement = screen.getByText(
        "Não foi possível carregar este álbum.",
      );

      expect(fail).toBeInTheDocument();
    });
  });

  it("should show album cover and tracks", async () => {
    (useAlbum as jest.Mock).mockImplementation(() => ({
      data: albumData,
      status: "success",
    }));

    render(<AlbumPage />);

    await waitFor(() => {
      const image: HTMLImageElement = screen.getByAltText(albumData.name);
      const track1: HTMLDivElement = screen.getByText(
        albumData.tracks.items[0].name,
      );

      expect(image).toBeInTheDocument();
      expect(track1).toBeInTheDocument();
    });
  });
});
