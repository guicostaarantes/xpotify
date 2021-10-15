import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";
import { setSearchStringDebounced } from "#/shared/store/search";
import Input from "#/styleguide/components/Input";

import styles from "./style.css";

const StartPage = () => {
  const searchString = useSelector(
    (store: ApplicationState) => store.search.searchString,
  );
  const dispatch = useDispatch();

  const handleSetSearchString = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchStringDebounced(event.target.value, 500));

  return (
    <div className={styles.container}>
      <label htmlFor="search">Busque por artistas, álbuns ou músicas</label>
      <Input
        className={styles.bigInput}
        id="search"
        onChange={handleSetSearchString}
        placeholder="Comece a escrever..."
        value={searchString}
      />
    </div>
  );
};

export default StartPage;
