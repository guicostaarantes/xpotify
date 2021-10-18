import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useArtistAlbums from "#/artist/hooks/useArtistAlbums";
import { visitAlbum } from "#/shared/store/history";
import AlbumCard from "#/styleguide/components/AlbumCard";
import MainTitle from "#/styleguide/components/MainTitle";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const ArtistAlbumsPage = () => {
  const { artistURLString } = useParams<{ artistURLString: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, status } = useArtistAlbums(artistURLString);

  const handleClickAlbum = (album: any) => {
    dispatch(visitAlbum(album));
    history.push(`/album/${album.id}`);
  };

  return (
    <div className={styles.container}>
      {status === "loading" ? (
        <Paragraph>Carregando...</Paragraph>
      ) : status === "fail" ? (
        <Paragraph>Ocorreu um erro na sua busca</Paragraph>
      ) : status === "success" ? (
        !data.artist ? (
          <Paragraph>Não foram encontrados álbuns para esse artista</Paragraph>
        ) : (
          <>
            <MainTitle>Álbuns de {data.artist.name}</MainTitle>
            <div className={styles.albumCardGrid}>
              {data.albums.items.map((album) => (
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
        )
      ) : null}
    </div>
  );
};

export default ArtistAlbumsPage;
