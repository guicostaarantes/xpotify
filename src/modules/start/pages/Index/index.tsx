import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";
import {
  setTokenDebounced,
  setUserDataFromToken,
} from "#/shared/store/spotify";
import Input from "#/styleguide/components/Input";
import MainTitle from "#/styleguide/components/MainTitle";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const Index = () => {
  const token = useSelector((store: ApplicationState) => store.spotify.token);
  const userName = useSelector(
    (store: ApplicationState) => store.spotify.userName,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserDataFromToken(token));
  }, []);

  const handleSetToken = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setTokenDebounced(event.target.value, 500));

  return (
    <div className={styles.container}>
      <MainTitle>Hello Xpotify</MainTitle>
      <Input
        placeholder="Insira o token"
        onChange={handleSetToken}
        value={token}
      />
      <Paragraph>
        {userName
          ? `Seja bem-vindo ${userName}`
          : `Digite um token válido para continuar`}
      </Paragraph>
    </div>
  );
};

export default Index;
