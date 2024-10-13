import { useContext } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { LuWallet } from "react-icons/lu";
import { RiQrScan2Line } from "react-icons/ri";
import { SiBitcoinsv } from "react-icons/si";
import { TbCoin } from "react-icons/tb";
import { DarkModeContext } from "../context/DarkMode";

const ShopeePayFitur = ({ onClick }) => {
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`z-10  rounded-md  !-mt-3 h-12 mx-4 px-2 gap-2 py-2  flex items-center ${
        isDarkMode ? "bg-[#0e0e0e]" : "bg-white"
      }`}
    >
      <div>
        <RiQrScan2Line size={20} color="gray" />
      </div>
      <div className="ml-2 flex flex-col w-full">
        <div
          className={`flex items-center gap-[2px] ${
            isDarkMode ? "text-white" : "text-secondary"
          }`}
        >
          <IoWalletOutline size={15} color="red" />
          <h1 className=" text-xs">ShopeePay</h1>
        </div>
        <h2 className="text-gray-400 text-[8px]">Bayar Cepat</h2>
      </div>
      <div className="ml-4 flex flex-col w-full">
        <div
          className={`flex items-center gap-[2px] ${
            isDarkMode ? "text-white" : "text-secondary"
          }`}
        >
          <TbCoin size={15} color="orange" />
          <h1 className=" text-xs">Koin</h1>
        </div>
        <h2 className="text-gray-400 text-[8px]">Gratis 25RB!</h2>
      </div>
      <div className="flex flex-col w-full">
        <div
          className={`flex items-center gap-[2px] ${
            isDarkMode ? "text-white" : "text-secondary"
          }`}
        >
          <LuWallet size={15} color="red" />
          <h1 className=" text-xs">Transfer</h1>
        </div>
        <h2 className="text-gray-400 text-[8px]">Gratis</h2>
      </div>
      <div className="min-w-9">
        <SiBitcoinsv size={20} color="red" />
      </div>
    </div>
  );
};

export default ShopeePayFitur;
