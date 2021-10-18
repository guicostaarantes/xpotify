import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useDispatch } from "react-redux";

import spotifyApi from "#/shared/spotifyApi";
import { invalidateToken } from "#/shared/store/user";

import useArtistAlbums from "./index";

jest.mock("react-redux");
jest.mock("#/shared/spotifyApi");
jest.mock("#/shared/store/user");

const Component = ({ artistURLString }: { artistURLString: string }) => {
  const { data } = useArtistAlbums(artistURLString);

  return <div>{data.artist?.id}</div>;
};

describe("useArtistAlbums hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should consult spotifyApi for data and return it", async () => {
    (spotifyApi as jest.Mock).mockImplementation((urlString: string) => ({
      status: 200,
      json: async () => ({
        artists: {
          items: [
            { id: urlString.replace("/search?type=artist&limit=1&query=", "") },
          ],
        },
      }),
    }));

    render(<Component artistURLString="123" />);

    await waitFor(() => {
      expect(spotifyApi).toBeCalledTimes(2);
      expect(spotifyApi).toHaveBeenNthCalledWith(
        1,
        "/search?type=artist&limit=1&query=123",
      );
      expect(spotifyApi).toHaveBeenNthCalledWith(2, "/artists/123/albums");
      const artistIdDiv: HTMLDivElement = screen.getByText("123");
      expect(artistIdDiv).toBeInTheDocument();
    });
  });

  it("should invalidate token if spotifyApi call fails with 401", async () => {
    const mockInvalidateToken = jest.fn(() => ({
      type: "MOCK_INVALIDATE_TOKEN",
    }));
    const mockDispatch = jest.fn();

    (spotifyApi as jest.Mock).mockImplementation(() => ({
      status: 401,
    }));
    (invalidateToken as jest.Mock).mockImplementation(mockInvalidateToken);
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    render(<Component artistURLString="456" />);

    await waitFor(() => {
      expect(spotifyApi).toBeCalledTimes(1);
      expect(spotifyApi).toBeCalledWith(
        "/search?type=artist&limit=1&query=456",
      );
      expect(mockDispatch).toBeCalledWith({
        type: "MOCK_INVALIDATE_TOKEN",
      });
    });
  });
});
