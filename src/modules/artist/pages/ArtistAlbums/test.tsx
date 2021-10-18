import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

import useArtistAlbums from "#/artist/hooks/useArtistAlbums";

import ArtistAlbumsPage from "./index";

const mockHistoryPush = jest.fn();

jest.mock("react-redux");
jest.mock("react-router-dom", () => ({
  useParams: () => ({
    artistURLString: "artist-name",
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
jest.mock("#/artist/hooks/useArtistAlbums");

const artistAlbumsData = {
  artist: { id: "1234", name: "Artist name" },
  albums: {
    items: [
      {
        id: "123",
        name: "Album 1",
        artists: [{ name: "Artist name" }],
        images: [{ url: "https://api.spotify.com/images/album-1.jpg" }],
      },
      {
        id: "456",
        name: "Album 2",
        artists: [{ name: "Artist name" }],
        images: [{ url: "https://api.spotify.com/images/album-2.jpg" }],
      },
      {
        id: "789",
        name: "Album 3",
        artists: [{ name: "Artist name" }],
        images: [{ url: "https://api.spotify.com/images/album-3.jpg" }],
      },
    ],
  },
};

describe("Album page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading message", async () => {
    (useArtistAlbums as jest.Mock).mockImplementation(() => ({
      status: "loading",
    }));

    render(<ArtistAlbumsPage />);

    await waitFor(() => {
      const loading: HTMLDivElement = screen.getByText("Carregando...");

      expect(loading).toBeInTheDocument();
    });
  });

  it("should show fail message", async () => {
    (useArtistAlbums as jest.Mock).mockImplementation(() => ({
      status: "fail",
    }));

    render(<ArtistAlbumsPage />);

    await waitFor(() => {
      const fail: HTMLDivElement = screen.getByText(
        "Não foi possível carregar os álbuns desse artista.",
      );

      expect(fail).toBeInTheDocument();
    });
  });

  it("should show not found message", async () => {
    (useArtistAlbums as jest.Mock).mockImplementation(() => ({
      data: {},
      status: "success",
    }));

    render(<ArtistAlbumsPage />);

    await waitFor(() => {
      const fail: HTMLDivElement = screen.getByText(
        "Não foram encontrados dados para o artista buscado.",
      );

      expect(fail).toBeInTheDocument();
    });
  });

  it("should show artist albums", async () => {
    (useArtistAlbums as jest.Mock).mockImplementation(() => ({
      data: artistAlbumsData,
      status: "success",
    }));

    render(<ArtistAlbumsPage />);

    await waitFor(() => {
      const title: HTMLDivElement = screen.getByText(
        `Álbuns de ${artistAlbumsData.artist.name}`,
      );
      const album1: HTMLDivElement = screen.getByText(
        artistAlbumsData.albums.items[0].name,
      );
      const album2: HTMLDivElement = screen.getByText(
        artistAlbumsData.albums.items[1].name,
      );
      const album3: HTMLDivElement = screen.getByText(
        artistAlbumsData.albums.items[2].name,
      );

      expect(title).toBeInTheDocument();
      expect(album1).toBeInTheDocument();
      expect(album2).toBeInTheDocument();
      expect(album3).toBeInTheDocument();
    });
  });
});
