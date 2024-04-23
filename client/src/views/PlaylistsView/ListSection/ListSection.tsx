import { useState } from "react";
import { Audio } from "react-loader-spinner";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CreatePlaylistModal } from "../../../components/Modals/CreatePlaylistModal";
import { usePlaylists } from "../../../contexts/PlaylistsContext/usePlaylists";

interface ListSectionProps {
  chosenPlaylistId: string | null;
  setChosenPlaylistId: (playlistId: string) => void;
}

export const ListSection: React.FC<ListSectionProps> = ({
  chosenPlaylistId,
  setChosenPlaylistId,
}) => {
  const { playlists, activePlaylist, deletePlaylist } = usePlaylists();
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState<boolean>(false);
  return (
    <section className="pr-2">
      <button
        onClick={() => setIsCreatePlaylistModalOpen(true)}
        className="flex items-center mb-4 w-full  hover:text-orange-400"
      >
        <div className="flex justify-center items-center w-20 h-20 bg-neutral-700 text-6xl mr-4">
          <BiPlus />
        </div>
        <p className="text-sm font-semibold ">New playlist</p>
      </button>
      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        close={() => setIsCreatePlaylistModalOpen(false)}
      />
      <ul>
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            style={{
              backgroundColor:
                playlist.id === chosenPlaylistId ? "#262626" : "transparent",
            }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => setChosenPlaylistId(playlist.id)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ")
                  setChosenPlaylistId(playlist.id);
              }}
              className="cursor-pointer flex items-center justify-between mb-4 w-full hover:text-orange-400 active:bg-neutral-800 transition-colors duration-200 ease-in-out"
            >
              <div className="flex items-center">
                <div className="flex justify-center items-center w-20 h-20 bg-neutral-700 text-5xl font-black mr-4">
                  {playlist.title[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold ">{playlist.title}</p>
                  <span className="flex pt-1 text-xs text-neutral-400">{`${playlist.placements.length} tracks`}</span>
                </div>
              </div>
              <div className="flex items-center">
                {playlist.id === activePlaylist?.playlistId && (
                  <Audio
                    height="32"
                    width="32"
                    color="#404040"
                    ariaLabel="track playing"
                  />
                )}
                <button
                  className="ml-3 text-3xl text-white flex justify-center items-center bg-neutral-700 hover:bg-red-400 focus:bg-red-400 active:bg-red-500 h-12 w-12 mr-4"
                  onClick={() => {
                    deletePlaylist(playlist.id);
                  }}
                >
                  <BiMinus />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
