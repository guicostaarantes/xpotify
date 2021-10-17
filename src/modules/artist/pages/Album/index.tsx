import React from "react";
import { useParams } from "react-router-dom";

import TrackList from "#/artist/components/TrackList";
import useAlbum from "#/artist/hooks/useAlbum";
import AlbumCard from "#/styleguide/components/AlbumCard";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const AlbumPage = () => {
  const { albumId } = useParams();

  const { data, status } = useAlbum(albumId);

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <Paragraph>Carregando...</Paragraph>
      ) : status === "fail" ? (
        <Paragraph>Não foi possível carregar este álbum.</Paragraph>
      ) : status === "success" ? (
        <>
          <div className={styles.albumCard}>
            <AlbumCard
              src={data.images[0]?.url}
              primaryText={data.name}
              secondaryText={data.artists[0]?.name}
            />
          </div>
          <TrackList tracks={data.tracks.items} />
        </>
      ) : null}
    </div>
  );
};

export default AlbumPage;
