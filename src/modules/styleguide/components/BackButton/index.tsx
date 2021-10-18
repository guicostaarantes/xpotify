import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useHistory } from "react-router-dom";

import styles from "./style.css";

const BackButton = () => {
  const history = useHistory();

  return (
    <button className={styles.container} onClick={() => history.goBack()}>
      <IoArrowBack /> Voltar
    </button>
  );
};

export default BackButton;
