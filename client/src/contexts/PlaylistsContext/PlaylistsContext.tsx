import React, { ReactNode, useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import type {
  Playlist,
  ActivePlaylist,
  Placement,
  Track,
} from "../../assets/types";

export interface PlaylistsContextType {
  playlists: Playlist[];
  createPlaylist: (playlistTitle: string) => void;
  deletePlaylist: (playlistId: string) => void;
  activePlaylist: ActivePlaylist | null;
  setActivePlaylist: (playlist: ActivePlaylist | null) => void;
  addTrackPlacement: (playlistId: string, track: Track) => void;
  removeTrackPlacement: (playlistId: string, placementId: string) => void;
}

export const PlaylistsContext = React.createContext<
  PlaylistsContextType | undefined
>(undefined);

export const PlaylistsProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activePlaylist, setActivePlaylist] = useState<ActivePlaylist | null>(
    null
  );

  const updatePlaylists = (updatedPlaylists: Playlist[]) => {
    setPlaylists(updatedPlaylists);
    // Mirror playlists state in localStorage for persistence between sessions
    localStorage &&
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
  };

  useEffect(() => {
    // Get stored playlists from localStorage on load
    const storedPlaylists = localStorage.getItem("playlists");
    if (storedPlaylists) {
      const playlistsAsJSON = JSON.parse(storedPlaylists);
      setPlaylists(playlistsAsJSON);
    }
  }, []);

  const value = useMemo(() => {
    const createPlaylist = (playlistTitle: string) => {
      const updatedPlaylists = [
        ...playlists,
        { id: uuidv4(), title: playlistTitle, placements: [] },
      ];
      updatePlaylists(updatedPlaylists);
    };

    const deletePlaylist = (playlistId: string) => {
      const updatedPlaylists = playlists.filter(
        (playlist) => playlist.id !== playlistId
      );
      updatePlaylists(updatedPlaylists);
    };

    const addTrackPlacement = (playlistId: string, track: Track) => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          const newPlacement: Placement = { placementId: uuidv4(), track };
          return {
            ...playlist,
            placements: [...playlist.placements, newPlacement],
          };
        } else return playlist;
      });
      updatePlaylists(updatedPlaylists);
    };

    const removeTrackPlacement = (
      playlistId: string,
      placementIdToRemove: string
    ) => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            placements: playlist.placements.filter(
              (placement) => placement.placementId !== placementIdToRemove
            ),
          };
        } else return playlist;
      });
      updatePlaylists(updatedPlaylists);
    };
    return {
      playlists,
      createPlaylist,
      deletePlaylist,
      activePlaylist,
      setActivePlaylist,
      addTrackPlacement,
      removeTrackPlacement,
    };
  }, [playlists, activePlaylist, setActivePlaylist]);

  return (
    <PlaylistsContext.Provider value={value}>
      {props.children}
    </PlaylistsContext.Provider>
  );
};
