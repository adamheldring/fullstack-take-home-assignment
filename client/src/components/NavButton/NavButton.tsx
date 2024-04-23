import type { View } from "../../assets/types";

interface NavButtonProps {
  activeView: View;
  updateView: (view: View) => void;
  navItemName: View;
}

export const NavButton: React.FC<NavButtonProps> = ({
  activeView,
  updateView,
  navItemName,
}) => (
  <button
    style={
      navItemName === activeView
        ? {
            color: "#ffffff",
            borderColor: "#f472b6",
          }
        : {
            color: "#767676",
            borderColor: "transparent",
          }
    }
    className="text-xl py-2 border-b-2 mr-8 transition-colors duration-75 ease-in-out"
    onClick={() => updateView(navItemName)}
  >
    {navItemName[0].toUpperCase() + navItemName.slice(1)}
  </button>
);
