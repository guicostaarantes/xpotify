import React from "react";
import { useParams } from "react-router-dom";

import TrackList from "#/artist/components/TrackList";
import useAlbum from "#/artist/hooks/useAlbum";
import AlbumCard from "#/styleguide/components/AlbumCard";
import BackButton from "#/styleguide/components/BackButton";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const AlbumPage = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const { data, status } = useAlbum(albumId);

  return (
    <div className={styles.container}>
      <BackButton />
      {status === "loading" ? (
        <Paragraph>Carregando...</Paragraph>
      ) : status === "fail" ? (
        <Paragraph>Não foi possível carregar este álbum.</Paragraph>
      ) : status === "success" ? (
        <div className={styles.albumContent}>
          <div className={styles.albumCard}>
            <AlbumCard
              src={data.images[0]?.url}
              primaryText={data.name}
              secondaryText={data.artists[0]?.name}
            />
          </div>
          <TrackList tracks={data.tracks.items} />
        </div>
      ) : null}
    </div>
  );
};

export default AlbumPage;
