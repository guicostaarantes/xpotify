import React from "react";

import MainTitle from "#/styleguide/components/MainTitle";
import Paragraph from "#/styleguide/components/Paragraph";

import styles from "./style.css";

const Index = () => (
  <>
    <MainTitle className={styles.hello}>Hello Xpotify</MainTitle>
    <Paragraph className={styles.hello}>
      Essa aplicação vai se comunicar com o Spotify pela sua API disponível em{" "}
      {process.env.SPOTIFY_API_BASE_URL}
    </Paragraph>
  </>
);

export default Index;
