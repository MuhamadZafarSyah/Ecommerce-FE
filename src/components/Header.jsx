import React, { useEffect, useState } from "react";
import { IoCartOutline, IoLogOutOutline } from "react-icons/io5";
import InputSearch from "./InputSearch";
import ActiveInputSearch from "./ActiveInputSearch";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkMode";
import { useSearch } from "../context/SearchContext";
import { Link, redirect, useNavigate } from "react-router-dom";
import customAPI from "../api";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/userSlice";
import { clearCart } from "../features/cartSlice";
const Header = (props) => {
  const { focusSearch, setFocusSearch } = useSearch();
  const { isDarkMode } = useContext(DarkModeContext);
  const countCart = useSelector((state) => state.cartState.cartItems.length);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(clearCart());
      dispatch(logoutUser());
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCart());
    }
  };
  return (
    <>
      {focusSearch ? (
        <div className="sticky top-0 z-10 bg-gradient-to-br from-primary to-gradientPrimary">
          <Link to={"/products"}>
            <div
              onClick={() => {
                setFocusSearch(false);
                window.scrollTo(0, 0);
              }}
              className="absolute right-24 top-4 z-50 h-8 w-4/6 lg:right-28 lg:w-5/6"
            ></div>
          </Link>
          <header className="sticky top-0 flex h-14 items-center justify-center px-4">
            <div className="flex w-full items-center gap-2 p-1">
              <InputSearch></InputSearch>
              <Link to={"/my-cart"} className="relative rounded-full">
                <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-secondary p-[5px] text-primary">
                  <span className="text-[8px]">{countCart}</span>
                </div>
                <IoCartOutline size={30} color="white" />
              </Link>
              <button>
                <IoLogOutOutline
                  onClick={handleLogout}
                  size={30}
                  color="white"
                />
              </button>
            </div>
          </header>
        </div>
      ) : (
        <div
          className={`sticky animate-fade ${
            isDarkMode ? "bg-secondary" : "bg-white"
          }`}
        >
          <ActiveInputSearch
            onClick={() => {
              setFocusSearch(true);
            }}
            search={props.search}
          >
            {props.children}
          </ActiveInputSearch>
        </div>
      )}
    </>
  );
};

export default Header;
