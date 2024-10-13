import React, { useContext } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { DarkModeContext } from "../context/DarkMode";

function InputSearch({ classname }) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex items-center border border-primary py-1 px-2 gap-1 rounded-md h-8  w-full ${
        isDarkMode ? "!bg-[#1E1E1E]" : "!bg-white"
      }`}
    >
      <MdOutlineSearch size={20} className="text-[#FF0000]" />
      <input
        type="text"
        placeholder="Hoodie Keren"
        className={`outline-none text-sm  placeholder:text-primary  w-full  ${
          isDarkMode ? "bg-secondary text-white" : "bg-white text-black"
        } `}
      />
    </div>
  );
}

export default InputSearch;
