import React from "react";

import formatDuration from "#/shared/utils/formatDuration";

import styles from "./style.css";

type TrackListProps = {
  tracks: Array<{
    id: string;
    track_number: number;
    name: string;
    duration_ms: number;
    preview_url: string;
  }>;
};

const TrackList = ({ tracks }: TrackListProps) => (
  <ol className={styles.trackList}>
    {tracks.map((track) => (
      <li className={styles.track} key={track.id}>
        <div className={styles.trackNumber}>{track.track_number}. </div>
        <div className={styles.trackTitle}>{track.name}</div>
        <div className={styles.trackDuration}>
          {formatDuration(track.duration_ms)}
        </div>
      </li>
    ))}
  </ol>
);

export default TrackList;
