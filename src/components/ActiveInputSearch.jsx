import React, { useContext } from "react";
import { MdOutlineArrowBack, MdOutlineSearch } from "react-icons/md";
import { DarkModeContext } from "../context/DarkMode";

function ActiveInputSearch(props) {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <header className="sticky top-0 flex h-14 items-center justify-center px-1">
        <div className="flex w-full items-center gap-2 p-1">
          <MdOutlineArrowBack onClick={props.onClick} size={23} color="red" />
          <div
            className={`flex h-8 w-full items-center gap-1 rounded-md border border-primary py-1 pl-2 ${
              isDarkMode ? "!bg-[#1E1E1E]" : "!bg-white"
            }`}
          >
            <input
              type="text"
              name="search"
              placeholder="Hoodie Keren"
              defaultValue={props.search}
              autoComplete="off"
              className={`w-full text-sm outline-none placeholder:text-primary ${
                isDarkMode ? "bg-secondary text-white" : "bg-white text-black"
              } `}
            />
            <button type="submit">
              <div className="rounded-md bg-primary p-[6px]">
                <MdOutlineSearch size={20} color="white" />
              </div>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`${
          isDarkMode ? "bg-secondary text-white" : "bg-white"
        } absolute !-mt-1 h-screen w-full`}
      >
        <div className="mt-2 px-4">
          <h1 className="text-center text-lg">Pilihan Kategori</h1>
          <div className="flex flex-col gap-4">{props.children}</div>
        </div>
      </div>
    </>
  );
}

export default ActiveInputSearch;
