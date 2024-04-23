import styles from "./AudioPlayer.module.css";
import { CgPlayList } from "react-icons/cg";
import { usePlaylists } from "../../contexts/PlaylistsContext/usePlaylists";
import type { Track } from "../../assets/types";
import React, { useRef, useState, useEffect } from "react";
import play from "../../assets/svgs/play.svg";
import pause from "../../assets/svgs/pause.svg";

interface AudioPlayerProps {
  track: Track;
  playNextTrack: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  track,
  playNextTrack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { activePlaylist } = usePlaylists();
  const activePlaylistTitle = activePlaylist?.playlistTitle;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e: Event) => {
    const target = e.target as HTMLAudioElement;
    setProgress(target.currentTime / target.duration || 0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime =
      (parseInt(e.target.value) / 1000) * audioRef.current.duration;
  };

  const handleTogglePlaybackClick = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.addEventListener("ended", playNextTrack);
    return () => {
      audio.removeEventListener("ended", playNextTrack);
    };
  }, [playNextTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.play();
    audioRef.current.currentTime = 0;
  }, [track]);

  return (
    <>
      <audio src={track.audio} ref={audioRef} />
      <div className={styles.audioPlayer}>
        <div>
          <img
            src={track.cover_art}
            alt="Playing track cover art"
            className="absolute w-12 h-12 ml-4 pointer-events-none opacity-40"
          />
          <button
            className={styles.togglePlaybackButton}
            onClick={handleTogglePlaybackClick}
          >
            <img src={isPlaying ? pause : play} alt={"Toggle audio play"} />
          </button>
        </div>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{track.title}</div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="1"
            max="1000"
            value={progress * 1000}
            className={styles.slider}
            onChange={handleSliderChange}
          />
        </div>
        {activePlaylistTitle && (
          <div className="mr-6 flex items-center">
            <div className="text-5xl mt-2 mr-1">
              <CgPlayList />
            </div>
            <div className="text-xs">
              <div className="text-neutral-400">Playlist</div>
              <div className="font-bold">{activePlaylistTitle}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
