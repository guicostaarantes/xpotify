import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useArtistAlbums from "#/artist/hooks/useArtistAlbums";
import { Album } from "#/shared/spotifyApi/types";
import { visitAlbum } from "#/shared/store/history";
import AlbumCard from "#/styleguide/components/AlbumCard";
import BackButton from "#/styleguide/components/BackButton";
import MainTitle from "#/styleguide/components/MainTitle";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const ArtistAlbumsPage = () => {
  const { artistURLString } = useParams<{ artistURLString: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const { data, status } = useArtistAlbums(artistURLString);

  const handleClickAlbum = (album: Album) => {
    dispatch(visitAlbum(album));
    history.push(`/album/${album.id}`);
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.artistContent}>
        {status === "loading" ? (
          <Paragraph>Carregando...</Paragraph>
        ) : status === "fail" ? (
          <Paragraph>
            Não foi possível carregar os álbuns desse artista.
          </Paragraph>
        ) : status === "success" ? (
          !data.artist ? (
            <Paragraph>
              Não foram encontrados dados para o artista buscado.
            </Paragraph>
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
    </div>
  );
};

export default ArtistAlbumsPage;
