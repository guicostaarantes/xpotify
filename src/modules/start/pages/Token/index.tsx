import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { ApplicationState } from "#/shared/store";
import {
  setTokenDebounced,
  setUserDataFromToken,
} from "#/shared/store/spotify";
import Input from "#/styleguide/components/Input";
import MainTitle from "#/styleguide/components/MainTitle";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const userMessage = (
  status: ApplicationState["spotify"]["fetchUserStatus"],
): string | JSX.Element => {
  switch (status) {
    case "idle":
      return "Entre na nossa plataforma inserindo um token do Spotify abaixo";
    case "loading":
      return "Carregando...";
    case "success":
      return <Redirect to="/" />;
    case "fail":
      return "Insira um token válido";
  }
};

const TokenPage = () => {
  const fetchUserStatus = useSelector(
    (store: ApplicationState) => store.spotify.fetchUserStatus,
  );
  const token = useSelector((store: ApplicationState) => store.spotify.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(setUserDataFromToken(token));
  }, []);

  const handleSetToken = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setTokenDebounced(event.target.value, 500));

  return (
    <div className={styles.container}>
      <MainTitle>Xpotify</MainTitle>
      <Paragraph className={styles.tokenParagraph}>
        {userMessage(fetchUserStatus)}
      </Paragraph>
      <Input
        className={styles.longInput}
        placeholder="Insira um token válido para continuar"
        onChange={handleSetToken}
        value={token}
      />
    </div>
  );
};

export default TokenPage;
