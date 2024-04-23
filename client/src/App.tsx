import { useState, useEffect, useCallback } from "react";
import { Layout } from "./components/Layout/Layout.tsx";
import { TracksView } from "./views/TracksView/TracksView.tsx";
import { PlaylistsView } from "./views/PlaylistsView/PlaylistsView.tsx";
import { usePlaylists } from "./contexts/PlaylistsContext/usePlaylists.tsx";

import type { Track, View } from "./assets/types.ts";

function App() {
  const [activeView, setActiveView] = useState<View>("tracks");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const { playlists, activePlaylist, setActivePlaylist } = usePlaylists();

  useEffect(() => {
    fetch("http://0.0.0.0:8000/tracks/", { mode: "cors" })
      .then((res) => res.json())
      .then((data) => setTracks(data));
  }, []);

  const handlePlay = (track: Track) => setCurrentTrack(track);

  const handleStop = () => {
    setCurrentTrack(null);
    setActivePlaylist(null);
  };

  const playNextTrack = useCallback(() => {
    // Only play next track if in active playlist mode
    if (!activePlaylist) {
      setCurrentTrack(null);
      return;
    }
    // Only play next track if active playlist still exists
    const currentPlaylist = playlists.find(
      (playlist) => playlist.id === activePlaylist.playlistId
    );
    if (!currentPlaylist) {
      setActivePlaylist(null);
      return;
    }
    // Play next track if current track can be found in active playlist and is not the last track
    const prevSongPlacementIndex = currentPlaylist.placements.findIndex(
      (placement) => placement.placementId === activePlaylist.currentPlacementId
    );
    if (
      prevSongPlacementIndex !== -1 &&
      prevSongPlacementIndex < currentPlaylist.placements.length - 1
    ) {
      const nextPlacement =
        currentPlaylist.placements[prevSongPlacementIndex + 1];
      setCurrentTrack(nextPlacement.track);
      setActivePlaylist({
        ...activePlaylist,
        currentPlacementId: nextPlacement.placementId,
      });
    } else {
      setActivePlaylist(null);
      setCurrentTrack(null);
    }
  }, [playlists, activePlaylist, setActivePlaylist]);

  return (
    <Layout
      activeView={activeView}
      updateView={(view: View) => setActiveView(view)}
      currentTrack={currentTrack}
      playNextTrack={playNextTrack}
    >
      {activeView === "playlists" ? (
        <PlaylistsView
          handlePlay={handlePlay}
          handleStop={handleStop}
          navigateToTracksView={() => setActiveView("tracks")}
        />
      ) : (
        <TracksView
          tracks={tracks}
          currentTrack={currentTrack}
          navigateToPlaylistsView={() => setActiveView("playlists")}
          handleStop={handleStop}
          handlePlaySingleTrack={(track: Track) => {
            handlePlay(track);
            // Reset active playlist when playing single track
            setActivePlaylist(null);
          }}
        />
      )}
    </Layout>
  );
}

export default App;
