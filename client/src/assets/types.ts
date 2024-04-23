export interface Track {
  id: string;
  title: string;
  length: number;
  bpm: number;
  genres: string[];
  moods: string[];
  main_artists: string[];
  featured_artists: string[];
  audio: string;
  cover_art: string;
  waveform: string;
  spotify: string;
}

export interface Placement {
  placementId: string;
  track: Track;
}

export interface Playlist {
  id: string;
  title: string;
  placements: Placement[];
}

export interface ActivePlaylist {
  playlistTitle: string;
  playlistId: string;
  currentPlacementId: string;
}

export type View = "tracks" | "playlists";
