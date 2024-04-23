import { useMemo, useState, useEffect } from "react";
import { ListSection } from "./ListSection/ListSection";
import { DetailSection } from "./DetailSection/DetailSection";
import { usePlaylists } from "../../contexts/PlaylistsContext/usePlaylists";
import type { Playlist, Track } from "../../assets/types";

interface PlaylistsViewProps {
  handlePlay: (track: Track) => void;
  handleStop: () => void;
  navigateToTracksView: () => void;
}

export const PlaylistsView: React.FC<PlaylistsViewProps> = ({
  handlePlay,
  handleStop,
  navigateToTracksView,
}) => {
  const [chosenPlaylistId, setChosenPlaylistId] = useState<string | null>(null);

  const { playlists } = usePlaylists();

  useEffect(() => {
    // If the chosen playlist is deleted, reset the chosen playlistId to null
    if (!playlists.find((playlist) => playlist.id === chosenPlaylistId))
      setChosenPlaylistId(null);
    // If no playlist is chosen, choose and display the first one
    !chosenPlaylistId &&
      playlists.length &&
      setChosenPlaylistId(playlists[0].id);
  }, [chosenPlaylistId, playlists]);

  const playlistDetail = useMemo(() => {
    return chosenPlaylistId
      ? playlists.find((playlist) => playlist.id === chosenPlaylistId)
      : null;
  }, [playlists, chosenPlaylistId]);

  return (
    <div className="flex justify-center pb-20">
      <div className="w-full">
        <div className="bg-orange-400 w-full h-48 flex flex-col p-8 mb-5">
          <h1 className="text-4xl tracking-tighter font-black ml-1 ita">
            My playlists
          </h1>
          <h1 className="text-8xl tracking-tighter font-black">
            {playlistDetail?.title}
          </h1>
        </div>
        <div className="flex">
          <div className="w-1/2">
            <ListSection
              chosenPlaylistId={playlistDetail?.id || null}
              setChosenPlaylistId={setChosenPlaylistId}
            />
          </div>
          <div className="w-1/2">
            {playlistDetail && (
              <DetailSection
                playlist={playlistDetail as Playlist}
                navigateToTracksView={navigateToTracksView}
                handlePlay={handlePlay}
                handleStop={handleStop}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
