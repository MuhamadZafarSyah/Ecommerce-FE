import React, { useContext } from "react";
import { FcMoneyTransfer, FcPhoneAndroid } from "react-icons/fc";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { SiWindows } from "react-icons/si";
import { DarkModeContext } from "../context/DarkMode";

const ShopeeFitur = ({ onClick }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      onClick={onClick}
      className={`rounded-md mt-2  h-24 mx-4 px-2 gap-2 py-2  flex items-center ${
        isDarkMode ? "bg-[#0e0e0e]" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center w-1/5 text-center justify-center ">
        <div className="bg-white p-1 mb-1 border rounded-md">
          <FcMoneyTransfer size={26} />
        </div>
        <h1
          className={` text-[8px] ${
            isDarkMode ? " text-gray-300" : "text-secondary"
          }`}
        >
          Gratis Ongkir dan Voucher
        </h1>
      </div>
      <div className="flex flex-col items-center w-1/5 text-center">
        <div className="bg-white p-1 mb-1 rounded-md border">
          <FcPhoneAndroid size={26} />
        </div>
        <h1
          className={` text-[8px] ${
            isDarkMode ? " text-gray-300" : "text-secondary"
          }`}
        >
          Pulsa, Tagihan, dan Tiket
        </h1>
      </div>
      <div className="flex flex-col !-mt-2 items-center w-1/5 text-center">
        <div className="bg-white p-1 mb-1 rounded-md border">
          <GiForkKnifeSpoon color="red" size={30} />
        </div>
        <h1
          className={` text-[8px] ${
            isDarkMode ? " text-gray-300" : "text-secondary"
          }`}
        >
          ShopeeFood
        </h1>
      </div>
      <div className="flex flex-col !-mt-2 items-center w-1/5 text-center">
        <div className="bg-white p-1 mb-1 rounded-md border">
          <IoGameController color="blue" size={30} />
        </div>
        <h1
          className={` text-[8px] ${
            isDarkMode ? " text-gray-300" : "text-secondary"
          }`}
        >
          ShopeeGames
        </h1>
      </div>
      <div className="flex flex-col !-mt-2 items-center w-1/5 text-center">
        <div className="bg-white p-2 mb-1 rounded-md border">
          <SiWindows color="red" size={25} />
        </div>
        <h1
          className={` text-[8px] ${
            isDarkMode ? " text-gray-300" : "text-secondary"
          }`}
        >
          Lihat Semua
        </h1>
      </div>
    </div>
  );
};

export default ShopeeFitur;
