import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import spotifyApi from "#/shared/spotifyApi";
import { ApplicationState } from "#/shared/store";
import { invalidateToken } from "#/shared/store/user";

const useAlbum = (albumId: string) => {
  const token = useSelector((store: ApplicationState) => store.user.token);
  const dispatch = useDispatch();

  const [albumData, setAlbumData] = useState<any>({});
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");

  useEffect(() => {
    (async () => {
      setFetchStatus("loading");
      const response = await spotifyApi(`/albums/${albumId}`);
      if (response.status === 200) {
        const data = await response.json();
        setAlbumData(data);
        setFetchStatus("success");
      } else {
        setFetchStatus("fail");
        const data = await response.json();
        if (data.error?.message === "Invalid access token") {
          dispatch(invalidateToken());
        }
      }
    })();
  }, [token]);

  return {
    data: albumData,
    status: fetchStatus,
  };
};

export default useAlbum;
