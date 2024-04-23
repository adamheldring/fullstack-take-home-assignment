import { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { CustomModal } from "./CustomModal";
import { usePlaylists } from "../../contexts/PlaylistsContext/usePlaylists";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  close: () => void;
}

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  close,
}) => {
  const [title, setTitle] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { createPlaylist } = usePlaylists();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current?.focus();
      setTitle("");
    }
  }, [isOpen]);

  return (
    <CustomModal title="Create Playlist" isOpen={isOpen} close={close}>
      <div>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={title}
            placeholder="Playlist name"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-600 pl-4 pr-16 py-4"
            onKeyDown={(e) => {
              if (e.key === "Enter" && title) {
                createPlaylist(title);
                close();
              }
            }}
          />
          {title && (
            <button
              onClick={() => {
                setTitle("");
                inputRef.current?.focus();
              }}
              className="absolute text-xl h-10 w-10 flex justify-center items-center top-2 right-2 hover:bg-neutral-700 focus:bg-neutral-700"
            >
              <IoMdClose />
            </button>
          )}
        </div>
        <div className="flex justify-end mt-5 pt-5 font-bold">
          <button
            className="bg-white text-neutral-700 py-3 px-4 text-sm"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className="bg-orange-400 text-white  py-3 px-4 text-sm ml-4 disabled:bg-neutral-400 disabled:opacity-50"
            disabled={!title}
            onClick={() => {
              createPlaylist(title);
              close();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </CustomModal>
  );
};
