import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { useDispatch } from "react-redux";

import spotifyApi from "#/shared/spotifyApi";
import { invalidateToken } from "#/shared/store/user";

import useAlbum from "./index";

jest.mock("react-redux");
jest.mock("#/shared/spotifyApi");
jest.mock("#/shared/store/user");

const Component = ({ albumId }: { albumId: string }) => {
  const { data } = useAlbum(albumId);

  return <div>{data?.id}</div>;
};

describe("useAlbum hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should consult spotifyApi for data and return it", async () => {
    (spotifyApi as jest.Mock).mockImplementation((id: string) => ({
      status: 200,
      json: async () => ({ id: id.replace("/albums/", "") }),
    }));

    render(<Component albumId="123" />);

    await waitFor(() => {
      expect(spotifyApi).toBeCalledTimes(1);
      expect(spotifyApi).toBeCalledWith("/albums/123");
      const albumIdDiv: HTMLDivElement = screen.getByText("123");
      expect(albumIdDiv).toBeInTheDocument();
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

    render(<Component albumId="456" />);

    await waitFor(() => {
      expect(spotifyApi).toBeCalledTimes(1);
      expect(spotifyApi).toBeCalledWith("/albums/456");
      expect(mockDispatch).toBeCalledWith({
        type: "MOCK_INVALIDATE_TOKEN",
      });
    });
  });
});
