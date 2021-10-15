import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";
import {
  setSearchResultFromSearchString,
  setSearchStringDebounced,
} from "#/shared/store/search";
import AlbumCard from "#/styleguide/components/AlbumCard";
import Input from "#/styleguide/components/Input";

import styles from "./style.css";

const StartPage = () => {
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
      {searchResult.albums?.items ? (
        <>
          <h3 className={styles.sectionTitle}>Álbuns</h3>
          <div className={styles.albumCardGrid}>
            {searchResult.albums.items.map((album) => (
              <AlbumCard
                key={album.id}
                src={album.images[1].url}
                primaryText={album.name}
                secondaryText={album.artists[0].name}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default StartPage;
