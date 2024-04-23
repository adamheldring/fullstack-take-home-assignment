import { useContext } from "react";
import { PlaylistsContext, PlaylistsContextType } from "./PlaylistsContext";

export const usePlaylists = (): PlaylistsContextType => {
  const context = useContext(PlaylistsContext);
  if (!context) {
    throw new Error(`usePlaylists must be used within an PlaylistsProvider`);
  }
  return context;
};
