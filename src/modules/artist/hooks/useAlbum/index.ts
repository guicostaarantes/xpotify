import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";

const useAlbum = (albumId: string) => {
  const token = useSelector((store: ApplicationState) => store.user.token);

  const [albumData, setAlbumData] = useState<any>({});
  const [fetchStatus, setFetchStatus] = useState<
    "idle" | "loading" | "success" | "fail"
  >("idle");

  useEffect(() => {
    (async () => {
      setFetchStatus("loading");
      const response = await fetch(
        `${process.env.SPOTIFY_API_BASE_URL}/albums/${albumId}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        const data = await response.json();
        setAlbumData(data);
        setFetchStatus("success");
      } else {
        setFetchStatus("fail");
      }
    })();
  }, [token]);

  return {
    data: albumData,
    status: fetchStatus,
  };
};

export default useAlbum;
