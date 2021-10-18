import React, { useEffect, useRef, useState } from "react";
import { IoArrowDown, IoArrowUp, IoPause, IoPlay } from "react-icons/io5";
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
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);
    cancelAnimationFrame(animationRef.current);
    animationRef.current = 0;
  }, [track]);

  const handlePlayLoop = () => {
    setCurrentTime(1000 * audioRef.current?.currentTime || 0);
    if (
      audioRef.current?.duration > 0 &&
      audioRef.current?.currentTime === audioRef.current?.duration
    ) {
      setHidden(true);
      setIsPlaying(false);
      setCurrentTime(0);
    } else if (animationRef.current) {
      animationRef.current = requestAnimationFrame(handlePlayLoop);
    }
  };

  const handleLoadedMetaData = () => {
    setHidden(false);
    setIsPlaying(true);
    setCurrentTime(0);
    if (audioRef.current?.duration) {
      animationRef.current = requestAnimationFrame(handlePlayLoop);
    }
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

  const handleHide = () => {
    setHidden(!hidden);
  };

  return (
    <>
      <div className={styles.spaceHolder}></div>
      <div
        className={`${styles.container} ${
          hidden ? styles.hiddenContainer : ""
        }`}
      >
        {track?.id ? (
          <button className={styles.hideButton} onClick={handleHide}>
            {hidden ? <IoArrowUp /> : <IoArrowDown />}
          </button>
        ) : null}
        {track?.id ? (
          <div className={styles.player}>
            <div className={styles.trackName}>
              {track.name} - {track.artists[0].name}
            </div>
            {track?.preview_url ? (
              <div className={styles.controls}>
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
                  {isPlaying ? (
                    <IoPause />
                  ) : (
                    <IoPlay className={styles.playButtonIcon} />
                  )}
                </button>
                <div className={styles.timer}>
                  {formatDuration(currentTime)}
                </div>
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
            ) : (
              <>Preview não disponível para essa música</>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MusicPlayer;
