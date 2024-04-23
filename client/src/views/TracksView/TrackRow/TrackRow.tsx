import { useState, useMemo } from "react";
import { Audio } from "react-loader-spinner";
import { BiPlus } from "react-icons/bi";
import { IoStopSharp } from "react-icons/io5";
import { AddTrackModal } from "../../../components/Modals/AddTrackModal";
import styles from "./TrackRow.module.css";
import play from "../../../assets/svgs/play.svg";

import type { Track } from "../../../assets/types";

interface TrackRowProps {
  track: Track;
  currentTrack: Track | null;
  handlePlaySingleTrack: (track: Track) => void;
  handleStop: () => void;
  navigateToPlaylistsView: () => void;
}

export const TrackRow: React.FC<TrackRowProps> = ({
  track,
  currentTrack,
  handlePlaySingleTrack,
  handleStop,
  navigateToPlaylistsView,
}) => {
  const [isAddTrackModalOpen, setIsAsddTrackModalOpen] = useState(false);
  const trackLengthInMinutes = useMemo(() => {
    const minutes = Math.floor(track.length / 60);
    const remainingSeconds = track.length % 60;
    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  }, [track]);

  const isCurrentTrack = useMemo(
    () => currentTrack?.id === track.id,
    [currentTrack, track]
  );

  return (
    <div
      className="hover:bg-zinc-800 transition-colors duration-200 ease-in-out cursor-pointer"
      onClick={() => {
        isCurrentTrack ? handleStop() : handlePlaySingleTrack(track);
      }}
    >
      <div className={styles.trackRow}>
        <img
          src={track.cover_art}
          alt="track cover art"
          className="absolute h-16 w-16 pointer-events-none"
        />
        <div className="flex items-center">
          <div className="flex  min-w-96">
            {isCurrentTrack ? (
              <button
                className="flex justify-center items-center bg-neutral-700 h-16 w-16 mr-4"
                onClick={handleStop}
              >
                <span className="text-xl">
                  <IoStopSharp />
                </span>
              </button>
            ) : (
              <button
                className="flex justify-center items-center bg-neutral-700 h-16 w-16 mr-4"
                onClick={() => handlePlaySingleTrack(track)}
              >
                <img src={play} alt="Play track" />
              </button>
            )}
            <div className="flex items-center">
              <div className={styles.trackInfo}>
                <div className={styles.trackTitle}>{track.title}</div>
                <div className={styles.trackArtist}>
                  {track.main_artists.join(", ")}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-neutral-400">
            <div>{track.bpm} bpm</div>
            <div>{trackLengthInMinutes} min</div>
          </div>
        </div>
        <div className="flex items-center">
          {track.id === currentTrack?.id && (
            <Audio
              height="32"
              width="32"
              color="#404040"
              ariaLabel="track playing"
            />
          )}
          <button
            className="ml-3 text-3xl flex justify-center items-center hover:bg-pink-400 focus:bg-pink-400 active:bg-pink-300 h-12 w-12 mr-4"
            onClick={(e) => {
              e.stopPropagation();
              setIsAsddTrackModalOpen(true);
            }}
          >
            <BiPlus />
          </button>
        </div>
        <AddTrackModal
          isOpen={isAddTrackModalOpen}
          close={() => setIsAsddTrackModalOpen(false)}
          track={track}
          navigateToPlaylistsView={navigateToPlaylistsView}
        />
      </div>
    </div>
  );
};
