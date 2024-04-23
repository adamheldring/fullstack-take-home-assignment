import { useMemo } from "react";
import { Audio } from "react-loader-spinner";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoStopSharp } from "react-icons/io5";
import { usePlaylists } from "../../../contexts/PlaylistsContext/usePlaylists";
import play from "../../../assets/svgs/play.svg";
import styles from "./DetailSection.module.css";
import type { Playlist, Track, Placement } from "../../../assets/types";

interface DetailSectionProps {
  playlist: Playlist;
  navigateToTracksView: () => void;
  handlePlay: (track: Track) => void;
  handleStop: () => void;
}
export const DetailSection: React.FC<DetailSectionProps> = ({
  playlist,
  navigateToTracksView,
  handlePlay,
  handleStop,
}) => {
  return (
    <section className="w-full h-full pl-2">
      {!playlist.placements.length && (
        <button
          className="text-orange-400 w-full  flex items-center justify-center tracking-tight hover:text-orange-300 focus:text-orange-300 hover:border-orange-300 border-2 border-orange-400 border-dashed h-16"
          onClick={navigateToTracksView}
        >
          <span className="text-2xl mr-1">
            <BiPlus />
          </span>
          Add some tracks to this playlist
        </button>
      )}
      <ul>
        {playlist.placements.map((placement) => (
          <PlaylistPlacementRow
            key={placement.placementId}
            placement={placement}
            handlePlay={handlePlay}
            handleStop={handleStop}
            playlist={playlist}
          />
        ))}
      </ul>
    </section>
  );
};

interface PlaylistPlacementRowProps {
  playlist: Playlist;
  placement: Placement;
  handlePlay: (track: Track) => void;
  handleStop: () => void;
}
const PlaylistPlacementRow: React.FC<PlaylistPlacementRowProps> = ({
  playlist,
  placement,
  handlePlay,
  handleStop,
}) => {
  const { placementId, track } = placement;

  const { removeTrackPlacement, activePlaylist, setActivePlaylist } =
    usePlaylists();

  const isPlacementPlaying = useMemo(() => {
    return activePlaylist?.currentPlacementId === placementId;
  }, [placementId, activePlaylist]);

  const handlePlayTrackFromList = (placementId: string, track: Track) => {
    handlePlay(track);
    setActivePlaylist({
      playlistId: playlist.id,
      playlistTitle: playlist.title,
      currentPlacementId: placementId,
    });
  };

  return (
    <li
      key={placementId}
      className={styles.playlistTrack}
      onClick={() =>
        isPlacementPlaying
          ? handleStop()
          : handlePlayTrackFromList(placementId, track)
      }
    >
      <div className="flex bg-neutral-800 mb-4">
        <div className="relative">
          <div className="h-16 w-16 bg-neutral-700">
            {isPlacementPlaying ? (
              <button
                className="w-full h-full flex justify-center items-center"
                onClick={handleStop}
              >
                <span className="text-xl">
                  <IoStopSharp />
                </span>
              </button>
            ) : (
              <button
                className="w-full h-full flex justify-center items-center"
                onClick={() => handlePlayTrackFromList(placementId, track)}
              >
                <img src={play} alt="Play playlist track" />
              </button>
            )}
          </div>
          <div className={styles.trackCoverArt}>
            <img
              src={track.cover_art}
              alt="Playlist track cover art"
              className="absolute top-0 left-0 h-16 w-16 pointer-events-none"
            />
          </div>
        </div>
        <div className="ml-2 p-2 flex justify-between w-full">
          <div className="flex flex-col">
            <span className="font-semibold">{track.title}</span>
            <span className="text-neutral-400">{track.main_artists}</span>
          </div>
          <div className="flex items-center">
            {isPlacementPlaying && (
              <Audio
                height="32"
                width="32"
                color="#404040"
                ariaLabel="track playing"
              />
            )}
            <button
              className="ml-3 text-3xl flex justify-center items-center bg-neutral-700 hover:bg-red-400 focus:bg-red-400 active:bg-red-300 h-12 w-12 mr-1"
              onClick={(e) => {
                removeTrackPlacement(playlist.id, placementId);
                e.stopPropagation();
              }}
            >
              <BiMinus />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
