import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";
import {
  setSearchResultFromSearchString,
  setSearchStringDebounced,
} from "#/shared/store/search";
import AlbumCard from "#/styleguide/components/AlbumCard";
import Input from "#/styleguide/components/Input";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const StartPage = () => {
  const fetchSearchStatus = useSelector(
    (store: ApplicationState) => store.search.fetchSearchStatus,
  );
  const searchResult = useSelector(
    (store: ApplicationState) => store.search.searchResult,
  );
  const searchString = useSelector(
    (store: ApplicationState) => store.search.searchString,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchString) dispatch(setSearchResultFromSearchString(searchString));
  }, []);

  const handleSetSearchString = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchStringDebounced(event.target.value, 500));

  return (
    <div className={styles.container}>
      <label className={styles.searchLabel} htmlFor="search">
        Busque por artistas, álbuns ou músicas
      </label>
      <Input
        className={styles.bigInput}
        id="search"
        onChange={handleSetSearchString}
        placeholder="Comece a escrever..."
        value={searchString}
      />
      {searchResult.albums?.items.length ? (
        <>
          <h3 className={styles.sectionTitle}>Álbuns</h3>
          <div className={styles.albumCardGrid}>
            {searchResult.albums.items.map((album) => (
              <AlbumCard
                key={album.id}
                src={album.images?.[0]?.url}
                primaryText={album.name}
                secondaryText={album.artists[0].name}
              />
            ))}
          </div>
        </>
      ) : null}
      {searchResult.artists?.items.length ? (
        <>
          <h3 className={styles.sectionTitle}>Artistas</h3>
          <div className={styles.albumCardGrid}>
            {searchResult.artists.items.map((artist) => (
              <AlbumCard
                key={artist.id}
                src={artist.images?.[0]?.url}
                primaryText={artist.name}
              />
            ))}
          </div>
        </>
      ) : null}
      {searchResult.tracks?.items.length ? (
        <>
          <h3 className={styles.sectionTitle}>Músicas</h3>
          <div className={styles.albumCardGrid}>
            {searchResult.tracks.items.map((track) => (
              <AlbumCard
                key={track.id}
                src={track.album.images?.[0]?.url}
                primaryText={track.name}
                secondaryText={track.artists[0].name}
              />
            ))}
          </div>
        </>
      ) : null}
      {fetchSearchStatus === "idle" ? (
        <Paragraph className={styles.searchResultMessage}>
          Termos buscados recentemente (WIP)
        </Paragraph>
      ) : fetchSearchStatus === "loading" ? (
        <Paragraph className={styles.searchResultMessage}>
          Carregando resultados...
        </Paragraph>
      ) : fetchSearchStatus === "fail" ? (
        <Paragraph className={styles.searchResultMessage}>
          Ocorreu um erro na sua busca. Tente novamente mais tarde.
        </Paragraph>
      ) : fetchSearchStatus === "success" &&
        !searchResult.albums?.items.length &&
        !searchResult.artists?.items.length &&
        !searchResult.tracks?.items.length ? (
        <Paragraph className={styles.searchResultMessage}>
          Não foram encontrados resultados com esse termo. Tente novamente.
        </Paragraph>
      ) : null}
    </div>
  );
};

export default StartPage;
