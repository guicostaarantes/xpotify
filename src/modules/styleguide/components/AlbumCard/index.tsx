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
    <p className={styles.primaryText}>{primaryText}</p>
    <p className={styles.secondaryText}>{secondaryText}</p>
  </div>
);

export default AlbumCard;
