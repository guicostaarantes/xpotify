const spotifyApi = async (
  route: string,
  method = "GET",
  options: RequestInit = {},
) => {
  const token = localStorage.getItem("token") || "default";

  const response = await fetch(`${process.env.SPOTIFY_API_BASE_URL}${route}`, {
    ...options,
    method,
    headers: {
      ...options.headers,
      authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default spotifyApi;
