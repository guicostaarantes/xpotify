import spotifyApi from "./index";

describe("spotifyApi fetch", () => {
  it("should fetch when spotifyApi is called", () => {
    const mockFetch = jest.fn();
    global.fetch = mockFetch;
    localStorage.setItem("token", "123456");
    process.env.SPOTIFY_API_BASE_URL = "https://api.mockify.com";

    spotifyApi("/me");
    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith("https://api.mockify.com/me", {
      headers: { authorization: "Bearer 123456" },
      method: "GET",
    });
  });
});
