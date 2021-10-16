import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";

const useArtistAlbums = (artistURLString: string) => {
  const token = useSelector((store: ApplicationState) => store.user.token);

  const [artistData, setArtistData] = useState<any>({});
  const [albumsData, setAlbumsData] = useState<any>({});
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");

  useEffect(() => {
    (async () => {
      setFetchStatus("loading");
      let artistId: string;

      const artistResponse = await fetch(
        `${process.env.SPOTIFY_API_BASE_URL}/search?type=artist&limit=1&query=${artistURLString}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (artistResponse.status === 200) {
        const data = await artistResponse.json();
        artistId = data.artists.items[0]?.id;
        setArtistData(data.artists.items[0]);
        if (!artistId) return;
      } else {
        setFetchStatus("fail");
        return;
      }

      const albumsResponse = await fetch(
        `${process.env.SPOTIFY_API_BASE_URL}/artists/${artistId}/albums`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (albumsResponse.status === 200) {
        const data = await albumsResponse.json();
        setAlbumsData(data);
        setFetchStatus("success");
      } else {
        setFetchStatus("fail");
      }
    })();
  }, [token]);

  return {
    data: { artist: artistData, albums: albumsData },
    status: fetchStatus,
  };
};

export default useArtistAlbums;
