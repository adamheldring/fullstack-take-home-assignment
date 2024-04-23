import { NavButton } from "../NavButton/NavButton.tsx";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer.tsx";
import type { View, Track } from "../../assets/types.ts";
import logo from "../../assets/svgs/logo.svg";

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  updateView: (view: View) => void;
  currentTrack: Track | null;
  playNextTrack: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeView,
  updateView,
  currentTrack,
  playNextTrack,
}) => {
  return (
    <>
      <main style={{ maxWidth: "1348px" }} className="p-4 container mx-auto">
        <nav className="flex">
          <img src={logo} className="w-5 h-auto mr-5" alt="Logo" />
          <ul className="flex my-8 ml-5">
            <li>
              <NavButton
                navItemName={"tracks"}
                activeView={activeView}
                updateView={updateView}
              />
            </li>
            <li>
              <NavButton
                navItemName={"playlists"}
                activeView={activeView}
                updateView={updateView}
              />
            </li>
          </ul>
        </nav>
        {children}
      </main>
      {currentTrack && (
        <AudioPlayer track={currentTrack} playNextTrack={playNextTrack} />
      )}
    </>
  );
};
