import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface CustmoModalProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  title: string;
}

export const CustomModal: React.FC<CustmoModalProps> = ({
  isOpen,
  close,
  children,
  title,
}) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed top-0 bottom-0 left-0 right-0 flex">
      <div
        className="absolute bg-black opacity-50 w-full h-full z-0"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      />
      <div
        style={{ width: "688px" }}
        className="bg-neutral-700 m-auto z-10 p-6"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-white text-xl font-semibold">{title}</h1>
          <button
            style={{ position: "relative", right: "-10px" }}
            className="text-3xl p-1 hover:bg-neutral-600 focus:bg-neutral-600"
            onClick={close}
          >
            <IoMdClose />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};
