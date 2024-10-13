import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { PriceFormat } from "../utils/index";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useRevalidator } from "react-router-dom";

const ProductCard = ({ item }) => {
  const [hooks, setHooks] = useState("");
  const { isDarkMode } = useContext(DarkModeContext);

  const { revalidate } = useRevalidator;

  useEffect(() => {
    if (item.price < 500000) {
      setHooks("Termurah di Shopee");
    } else {
      setHooks("Produk Baru");
    }
  }, []);

  const getUser = useSelector((state) => state.userState.user);

  const isAdmin = getUser?.role === "admin";

  return (
    <div
      key={item._id}
      className={`relative rounded-md ${
        isDarkMode
          ? "border border-transparent bg-neutral-900 text-white"
          : "border bg-white !text-black"
      }`}
    >
      <Link to={`/product/${item._id}`}>
        <div className="rounded-md">
          <img
            className="h-72 w-full rounded-t-md object-cover"
            src={
              item.image ||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={item.name}
          />
          {item.stock < 1 && (
            <div className="absolute left-0 top-0 rounded-md bg-[#FF0000] px-3 py-2 backdrop-blur-3xl">
              <p className="text-xs text-white">Sold out</p>
            </div>
          )}
        </div>
        <div className="mt-2 p-2">
          <h1 className="text-xs">{item.name}</h1>
          <div className="my-1 flex items-center justify-start">
            <div className="border border-[#FF0000] px-[4px] py-[1px] text-[8px] text-[#FF0000]">
              {hooks}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-semibold text-[#FF0000]">
              {PriceFormat(item.price)}
            </h1>
            <h2 className="text-xs">Stock : {item.stock}</h2>
          </div>
        </div>
      </Link>
      {isAdmin && (
        <div className="absolute right-0 top-0 rounded-md bg-black px-4 py-3 opacity-80">
          <div className="flex items-center justify-between gap-2">
            <Link to={`/product/${item._id}/edit`}>
              <FaEdit size={20} color="white" />
            </Link>

            <Link
              onClick={async () => {
                await customAPI.delete(`/product/${item._id}`);
                toast.warning("Berhasil hapus data produk");
                revalidate();
              }}
            >
              <FaTrashAlt size={20} color="orange" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductCard;
