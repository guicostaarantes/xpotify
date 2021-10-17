import React from "react";
import { useDispatch } from "react-redux";

import { selectTrack } from "#/shared/store/player";
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

const TrackList = ({ tracks }: TrackListProps) => {
  const dispatch = useDispatch();

  return (
    <ol className={styles.trackList}>
      {tracks.map((track) => (
        <li
          className={styles.track}
          key={track.id}
          onClick={() => dispatch(selectTrack(track))}
        >
          <div className={styles.trackNumber}>{track.track_number}. </div>
          <div className={styles.trackTitle}>{track.name}</div>
          <div className={styles.trackDuration}>
            {formatDuration(track.duration_ms)}
          </div>
        </li>
      ))}
    </ol>
  );
};

export default TrackList;
