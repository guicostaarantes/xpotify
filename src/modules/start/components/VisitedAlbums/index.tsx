import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { ApplicationState } from "#/shared/store";
import { visitAlbum } from "#/shared/store/history";
import AlbumCard from "#/styleguide/components/AlbumCard";

import styles from "./style.css";

const LatestVisitedAlbums = () => {
  const latestVisitedAlbums = useSelector(
    (store: ApplicationState) => store.history.latestVisitedAlbums,
  );
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClickAlbum = (album: any) => {
    dispatch(visitAlbum(album));
    history.push(`/album/${album.id}`);
  };

  return (
    <>
      <h3 className={styles.sectionTitle}>Álbuns visitados recentemente</h3>
      <div className={styles.albumCardGrid}>
        {latestVisitedAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            onClick={() => handleClickAlbum(album)}
            src={album.images?.[0]?.url}
            primaryText={album.name}
            secondaryText={album.artists[0].name}
          />
        ))}
      </div>
    </>
  );
};

export default LatestVisitedAlbums;
