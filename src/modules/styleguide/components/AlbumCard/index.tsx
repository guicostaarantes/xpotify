import React from "react";

import styles from "./style.css";

type AlbumCardProps = {
  src: string;
  primaryText: string;
  secondaryText?: string;
};

const AlbumCard = ({
  src,
  primaryText,
  secondaryText = "",
}: AlbumCardProps) => (
  <div className={styles.container}>
    <img className={styles.img} src={src} alt={primaryText} />
    <div className={styles.primaryText}>{primaryText}</div>
    <div className={styles.secondaryText}>{secondaryText}</div>
  </div>
);

export default AlbumCard;
