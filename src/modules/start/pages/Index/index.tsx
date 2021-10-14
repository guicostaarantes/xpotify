import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";
import { spotifyActions } from "#/shared/store/spotify";
import Input from "#/styleguide/components/Input";
import MainTitle from "#/styleguide/components/MainTitle";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const Index = () => {
  const token = useSelector((store: ApplicationState) => store.spotify.token);
  const dispatch = useDispatch();

  const { setToken } = spotifyActions;

  const handleSetToken = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setToken(event.target.value));

  return (
    <div className={styles.container}>
      <MainTitle>Hello Xpotify</MainTitle>
      <Input placeholder="Insira o token" onChange={handleSetToken} />
      <Paragraph>
        Essa aplicação vai se comunicar com o Spotify pela sua API disponível em{" "}
        {process.env.SPOTIFY_API_BASE_URL} utilizando o token {token}
      </Paragraph>
    </div>
  );
};

export default Index;
