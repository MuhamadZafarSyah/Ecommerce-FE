import React, { useContext, useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { LiaArrowLeftSolid, LiaShareSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";

function HeaderDetail() {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  // const [countCart, setCountCart] = useState(() => {
  //   const getDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
  //   return getDataFromLocalStorage
  //     ? getDataFromLocalStorage.cartItems.length
  //     : 0;
  // });

  const countCart = useSelector((state) => state.cartState.cartItems.length);

  return (
    <header className="fixed w-full top-0 h-14 flex justify-between items-center px-4 inset-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
      <Link to={"/products"}>
        <div className="center-center p-1 bg-gray-800 opacity-40  rounded-full">
          <LiaArrowLeftSolid size={25} color="white" />
        </div>
      </Link>
      <div className="center-center gap-4">
        <div className="center-center p-1 bg-gray-800 opacity-40 rounded-full">
          <LiaShareSolid size={25} color="white" />
        </div>
        <Link
          to={"/my-cart"}
          className="center-center p-1 bg-gray-800 opacity-40 rounded-full"
        >
          <div className="relative rounded-full">
            <div className="w-4 h-4 p-[10px] flex justify-center items-center rounded-full bg-red-600 text-white absolute -top-2 -right-2">
              <span className="text-[8px] ">{countCart}</span>
            </div>
            <IoCartOutline size={25} color="white" />
          </div>
        </Link>
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="center-center p-2 bg-gray-800 opacity-40 rounded-full"
        >
          {!isDarkMode ? (
            <>
              <FaMoon size={18} color="white" />
            </>
          ) : (
            <>
              <FaSun size={18} color="white" />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderDetail;
