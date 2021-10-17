import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import spotifyApi from "#/shared/spotifyApi";
import { ApplicationState } from "#/shared/store";
import { invalidateToken } from "#/shared/store/user";

const useArtistAlbums = (artistURLString: string) => {
  const token = useSelector((store: ApplicationState) => store.user.token);
  const dispatch = useDispatch();

  const [artistData, setArtistData] = useState<any>({});
  const [albumsData, setAlbumsData] = useState<any>({});
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");

  useEffect(() => {
    (async () => {
      setFetchStatus("loading");
      let artistId: string;

      const artistResponse = await spotifyApi(
        `/search?type=artist&limit=1&query=${artistURLString}`,
      );

      if (artistResponse.status === 200) {
        const data = await artistResponse.json();
        artistId = data.artists.items[0]?.id;
        setArtistData(data.artists.items[0]);
        if (!artistId) return;
      } else {
        setFetchStatus("fail");
        if (artistResponse.status === 401) {
          dispatch(invalidateToken());
        }
        return;
      }

      const albumsResponse = await spotifyApi(`/artists/${artistId}/albums`);

      if (albumsResponse.status === 200) {
        const data = await albumsResponse.json();
        setAlbumsData(data);
        setFetchStatus("success");
      } else {
        if (albumsResponse.status === 401) {
          dispatch(invalidateToken());
        }
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
