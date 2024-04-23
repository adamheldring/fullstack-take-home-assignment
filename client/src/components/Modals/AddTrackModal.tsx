import { useRef, useEffect, useState } from "react";
import { CustomModal } from "./CustomModal";
import { BiPlus } from "react-icons/bi";
import { usePlaylists } from "../../contexts/PlaylistsContext/usePlaylists";
import type { Track } from "../../assets/types";

interface AddTrackModalProps {
  isOpen: boolean;
  close: () => void;
  track: Track;
  navigateToPlaylistsView: () => void;
}

export const AddTrackModal: React.FC<AddTrackModalProps> = ({
  isOpen,
  close,
  track,
  navigateToPlaylistsView,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const { playlists, addTrackPlacement } = usePlaylists();

  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);

  // Give user quick feedback when a track is added to a playlist before closing modal
  const [addedTrackToPlaylistId, setAddedTrackToPlaylistId] = useState<
    string | null
  >(null);

  const handleAddTrack = (playlistId: string, track: Track) => {
    addTrackPlacement(playlistId, track);
    setAddedTrackToPlaylistId(playlistId);
    setTimeout(() => {
      close();
      setAddedTrackToPlaylistId(null);
    }, 400);
  };

  return (
    <CustomModal title="Add Track" isOpen={isOpen} close={close}>
      <div className="flex flex-col-reverse">
        <div className="flex justify-end mt-5 pt-5 font-bold">
          <button
            ref={cancelButtonRef}
            className="bg-white text-neutral-700 py-3 px-4 text-sm"
            onClick={close}
          >
            Cancel
          </button>
        </div>
        <div className="mt-5">
          {!playlists.length ? (
            <button
              className="text-pink-400 w-full  flex items-center justify-center tracking-tight hover:text-pink-300 focus:text-pink-300 hover:border-pink-300 border-2 border-pink-400 border-dashed h-16"
              onClick={navigateToPlaylistsView}
            >
              <span className="text-2xl mr-1">
                <BiPlus />
              </span>
              Create your first playlist
            </button>
          ) : (
            playlists.map((playlist) => (
              <button
                key={playlist.id}
                className="bg-neutral-600 w-full flex items-center justify-between h-12 pl-2 mb-2 hover:bg-pink-400 focus:bg-pink-400"
                onClick={() => {
                  handleAddTrack(playlist.id, track);
                }}
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 mr-2 flex justify-center items-center font-black text-lg bg-neutral-800">
                    {playlist.title[0].toUpperCase()}
                  </div>
                  <div>{playlist.title}</div>
                </div>
                <div
                  className="text-xs text-white mr-5 font-semibold transition-transform duration-50 ease-in-out"
                  style={{
                    transform: `scale(${
                      addedTrackToPlaylistId === playlist.id ? 1.3 : 1
                    })`,
                  }}
                >
                  {`${playlist.placements.length} tracks`}
                </div>
              </button>
            ))
          )}
        </div>
        <p className="text-sm text-neutral-300">
          Add track{" "}
          <span className="font-bold text-white mx-px">{` ${track.title} `}</span>
          by
          <span className="font-bold text-white mx-px">
            {` ${track.main_artists.join(", ")} `}
          </span>{" "}
          to playlist:
        </p>
      </div>
    </CustomModal>
  );
};
