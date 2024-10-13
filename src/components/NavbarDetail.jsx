import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkMode";
import { AiOutlineMessage } from "react-icons/ai";

function NavbarDetail({ onClick }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <nav
      className={`sticky bottom-0 h-12  ${
        isDarkMode ? "bg-[#191919]" : "bg-white"
      }`}
    >
      <div className="flex divide-x-2 divide-zinc-800 divide-dashed h-full">
        <div className="bg-green-600 p-2 w-1/2 flex items-center justify-center ">
          <AiOutlineMessage size={30} color="white" />
        </div>
        <div
          onClick={onClick}
          className="bg-primary  p-2 w-1/2 flex items-center justify-center "
        >
          <span className="text-white">Beli Sekarang</span>
        </div>
      </div>
    </nav>
  );
}

export default NavbarDetail;
