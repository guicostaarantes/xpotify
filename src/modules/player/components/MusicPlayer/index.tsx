import React, { useRef, useState } from "react";
import { IoPause, IoPlay } from "react-icons/io5";
import { useSelector } from "react-redux";

import { ApplicationState } from "#/shared/store";
import formatDuration from "#/shared/utils/formatDuration";

import styles from "./style.css";

const MusicPlayer = () => {
  const track = useSelector((store: ApplicationState) => store.player.track);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const animationRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayLoop = () => {
    setCurrentTime(1000 * audioRef.current?.currentTime);
    if (audioRef.current?.currentTime === audioRef.current?.duration) {
      setIsPlaying(false);
      setCurrentTime(0);
    } else {
      animationRef.current = requestAnimationFrame(handlePlayLoop);
    }
  };

  const handleLoadedMetaData = () => {
    console.log("meta");
    setIsPlaying(true);
    setCurrentTime(0);
    animationRef.current = requestAnimationFrame(handlePlayLoop);
    if (progressRef.current) {
      progressRef.current.max = String(1000 * audioRef.current?.duration);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(handlePlayLoop);
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressBarChange = () => {
    audioRef.current.currentTime = Number(progressRef.current.value) / 1000;
    setCurrentTime(Number(progressRef.current.value));
  };

  return (
    <>
      <div className={styles.spaceHolder}></div>
      <div className={styles.container}>
        {track.preview_url ? (
          <div className={styles.player}>
            <audio
              ref={audioRef}
              autoPlay
              preload="metadata"
              src={track.preview_url}
              onLoadedMetadata={handleLoadedMetaData}
            />
            <button
              className={styles.playPauseButton}
              onClick={handlePlayPause}
            >
              {isPlaying ? <IoPause /> : <IoPlay style={{ paddingLeft: 2 }} />}
            </button>
            <div className={styles.timer}>{formatDuration(currentTime)}</div>
            <div>
              <input
                ref={progressRef}
                className={styles.progressBar}
                type="range"
                value={currentTime}
                onChange={handleProgressBarChange}
              />
            </div>
            <div className={styles.timer}>
              {formatDuration(1000 * audioRef.current?.duration || 0)}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MusicPlayer;
