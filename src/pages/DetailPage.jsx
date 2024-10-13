import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useParams } from "react-router-dom";
import customAPI from "../api";
import { DarkModeContext } from "../context/DarkMode";
import { PacmanLoader } from "react-spinners";
import useLogin from "../hooks/useLogin";
import { generateSelectAmount } from "../utils";
import HeaderDetail from "../components/HeaderDetail";
import { PriceFormat } from "../utils/index";
import NavbarDetail from "../components/NavbarDetail";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cartSlice";
// import "../app.css";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

export const action =
  (store) =>
  async ({ request }) => {
    const fromInputData = await request.formData();
    const data = Object.fromEntries(fromInputData);
    return data;
  };

const DetailPage = () => {
  useLogin();

  const { isDarkMode } = useContext(DarkModeContext);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  // STORE
  const dispatch = useDispatch();
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const DetailProduct = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    DetailProduct();
    window.scrollTo(0, 0);
  }, []);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const productCart = {
    cartId: product._id + product.name,
    productId: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    stock: product.stock,
    amount,
  };

  const handleCart = () => {
    dispatch(addItem({ product: productCart }));
  };

  return (
    <>
      {isLoading || !product ? (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      ) : (
        <></>
      )}
      <HeaderDetail />
      <div
        className={`min-h-screen pb-10 ${
          isDarkMode ? "bg-secondary text-white" : "bg-whitemode text-black"
        }`}
      >
        <div className="w-full">
          <img
            className="!max-h-96 w-full object-cover"
            src={
              product.image ||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={product.name}
          />
        </div>
        <div className="p-4 px-2">
          <h1 className="text-2xl font-bold text-primary">
            {PriceFormat(product.price)}
          </h1>
          <div className="mt-2 flex flex-col gap-4">
            <div>
              <h1 className="text-xl">{product.name}</h1>
              <div className="my-1 flex items-center justify-start">
                <div className="border border-[#FF0000] px-[4px] py-[1px] text-xs text-[#FF0000]">
                  {product.price < 500000
                    ? "Termurah di Shopee"
                    : "Produk Baru"}
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold">Deskripsi</h1>
              <h1>{product.description}</h1>
            </div>
          </div>
        </div>
        <Drawer
          open={isOpen}
          size={"40%"}
          onClose={toggleDrawer}
          direction="bottom"
          className="size-full h-full rounded-t-3xl"
        >
          <div
            className={`rounded-t-3xl p-4 ${
              isDarkMode ? "bg-secondary text-white" : "bg-white !text-black"
            }`}
          >
            <div onClick={toggleDrawer} className="absolute right-4 top-2">
              <span className="text-lg">X</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-36 rounded-2xl">
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={
                    product.image ||
                    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                  }
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl text-primary">
                  {PriceFormat(product.price)}
                </h1>
                <div className="my-1 flex items-center justify-start">
                  <div className="border border-[#FF0000] px-[4px] py-[1px] text-xs text-[#FF0000]">
                    {product.price < 500000
                      ? "Termurah di Shopee"
                      : "Produk Baru"}
                  </div>
                </div>
                <h1>Stock: {product.stock}</h1>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <span>Jumlah</span>
                <select
                  name="amount"
                  onChange={handleAmount}
                  className="w-1/2 rounded-lg border bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {generateSelectAmount(product.stock)}
                </select>
              </div>
            </div>
            {product.stock === 0 ? (
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-neutral-900 py-2 text-center text-white"
              >
                Stock Produk Habis
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleCart}
                className="mt-4 w-full rounded-md bg-primary py-2 text-center text-white"
              >
                Beli Sekarang
              </button>
            )}
          </div>
        </Drawer>
      </div>
      <NavbarDetail onClick={toggleDrawer} />
    </>
  );
};

export default DetailPage;
