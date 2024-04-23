import { TrackRow } from "./TrackRow/TrackRow.tsx";
import type { Track } from "../../assets/types.ts";

interface TracksViewProps {
  tracks: Track[];
  currentTrack: Track | null;
  navigateToPlaylistsView: () => void;
  handlePlaySingleTrack: (track: Track) => void;
  handleStop: () => void;
}

export const TracksView: React.FC<TracksViewProps> = ({
  tracks,
  currentTrack,
  navigateToPlaylistsView,
  handlePlaySingleTrack,
  handleStop,
}) => {
  return (
    <div className="pb-20">
      <div className="bg-pink-400 w-full h-48 flex flex-col p-8 mb-5">
        <h2 className="text-4xl tracking-tighter font-black ml-1 ita">
          Popular
        </h2>
        <h1 className="text-8xl tracking-tighter font-black">Tracks</h1>
      </div>
      {tracks.map((track, idx) => (
        <TrackRow
          key={idx}
          track={track}
          currentTrack={currentTrack}
          handlePlaySingleTrack={handlePlaySingleTrack}
          handleStop={handleStop}
          navigateToPlaylistsView={navigateToPlaylistsView}
        />
      ))}
    </div>
  );
};
