import React from "react";

import styles from "./style.css";

type AlbumCardProps = {
  onClick?: () => void;
  src: string;
  primaryText: string;
  secondaryText?: string;
};

const AlbumCard = ({
  onClick = () => 0,
  src,
  primaryText,
  secondaryText = "",
}: AlbumCardProps) => (
  <div className={styles.container} onClick={onClick}>
    <img
      className={styles.img}
      onError={(ev) =>
        ((ev.target as HTMLImageElement).src = "fallback-album-card-image.png")
      }
      src={src || "fallback-album-card-image.png"}
      alt={primaryText}
    />
    <p className={styles.primaryText}>{primaryText}</p>
    <p className={styles.secondaryText}>{secondaryText}</p>
  </div>
);

export default AlbumCard;
