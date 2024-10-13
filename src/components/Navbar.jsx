import React, { useContext } from "react";
import { FaMoon, FaRegFileVideo, FaSun } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder, MdOutlineNewLabel } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { useSearch } from "../context/SearchContext";
import { useSelector } from "react-redux";
import { PiPackage } from "react-icons/pi";

function Navbar() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const { setFocusSearch } = useSearch();

  const getUser = useSelector((state) => state.userState.user);

  const isAdmin = getUser?.role === "admin";

  return (
    <nav
      className={`center-center sticky bottom-0 h-16 w-full ${
        isDarkMode ? "bg-[#191919]" : "bg-white"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 px-4">
        <Link
          onClick={() => setFocusSearch(true)}
          to={"/"}
          className="flex flex-col items-center"
        >
          <TiHome size={32} color="red" />
          <h1 className="text-[10px] text-primary">Beranda</h1>
        </Link>
        <Link to={"/products"} className="flex flex-col items-center">
          <MdOutlineNewLabel size={32} color="red" />
          <h1 className="text-[10px] text-primary">Semua Produk</h1>
        </Link>
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="mt-1 flex flex-col items-center justify-center"
        >
          {!isDarkMode ? (
            <>
              <FaMoon size={28} color="red" />
              <h1 className="text-[10px] text-primary">Dark</h1>
            </>
          ) : (
            <>
              <FaSun size={28} color="red" />
              <h1 className="text-[10px] text-primary">Light</h1>
            </>
          )}
        </div>
        {isAdmin && (
          <Link
            to={"/product/create"}
            className="flex flex-col items-center justify-center"
          >
            <MdOutlineCreateNewFolder size={26} color="red" />
            <h1 className="!-mb-1 text-[10px] text-primary">Product</h1>
          </Link>
        )}
        <Link
          to={"/orders"}
          className="flex flex-col items-center justify-center"
        >
          <PiPackage size={26} color="red" />
          <h1 className="!-mb-1 text-[10px] text-primary">Pesanan</h1>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <IoPersonOutline size={26} color="red" />
          <h1 className="!-mb-1 text-[10px] text-primary">Saya</h1>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
