import React, { useContext, useEffect, useRef } from "react";
import customAPI from "../api";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Header from "../components/Header";
import generatePDF from "react-to-pdf";
import { DarkModeContext } from "../context/DarkMode";
import Navbar from "../components/Navbar";
import { FaRegEye } from "react-icons/fa";
import { PriceFormat } from "../utils";
// import component 👇
import Drawer from "react-modern-drawer";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { PacmanLoader } from "react-spinners";
import useLogin from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export const loader = (storage) => async () => {
  const getUser = storage.getState().userState.user;

  if (!getUser) {
    toast.warn("Login Terlebih Dahulu");
    return redirect("/login");
  }

  try {
    let products;
    if (getUser.role == "user") {
      const { data } = await customAPI.get("/order/current/user");
      products = data.data;
      return { products };
    } else {
      const { data } = await customAPI.get("/order");
      products = data.data;
      return { products };
    }
    return getUser;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    toast.error(errorMessage + ", Harap login!");
    const unautharized = error?.response?.status === 401;
    if (unautharized) {
      return redirect("/login");
    }
  }
};

function OrderPage() {
  const { products } = useLoaderData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const getUser = useSelector((state) => state.userState.user);
  const targetRef = useRef();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!products.length) {
    return (
      <>
        {isLoading && (
          <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
            <PacmanLoader color="#FF0000" className="z-50" />
          </main>
        )}
        <Header />
        <div
          className={`relative flex min-h-screen items-center justify-center ${
            isDarkMode ? "bg-secondary !text-white" : "bg-whitemode text-black"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <h1 className="mx-auto text-center">Anda Belum Order Apapun</h1>
          </div>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <>
      {isLoading && (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      )}

      <Header />

      <div
        className={`relative min-h-screen pb-10 ${
          isDarkMode ? "bg-secondary !text-white" : "bg-whitemode text-black"
        }`}
      >
        <div
          className={`relative flex h-full w-full flex-col rounded-xl bg-clip-border shadow-md ${isDarkMode ? "bg-neutral-900" : "bg-white"}`}
        >
          <div className="relative mx-4 mt-4 overflow-hidden rounded-none bg-clip-border">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal">
                  Data Transaksi Orderan
                </h5>
                <p className="mt-1 block font-sans text-base font-normal leading-relaxed">
                  Ini adalah data terbaru dari orderan user
                </p>
              </div>
              <div className="flex w-full shrink-0 justify-end gap-2 md:w-max">
                <button
                  onClick={() => {
                    setIsDarkMode(false);
                    setTimeout(() => {
                      generatePDF(targetRef, { filename: "Data orderan.pdf" });
                    }, 100);
                  }}
                  className="flex select-none items-center gap-3 rounded-lg bg-gray-900 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    ></path>
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
          <div ref={targetRef} className="overflow-scroll p-6 px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr
                  className={` ${isDarkMode ? "!border-none bg-secondary" : "bg-[#F5F7F8]"}`}
                >
                  <th className="border-y !border-[#E5E7EB] p-4">
                    <p className="block font-sans text-sm font-normal leading-none">
                      Order By
                    </p>
                  </th>
                  <th className="border-y !border-[#E5E7EB] p-4">
                    <p className="block font-sans text-sm font-normal leading-none">
                      No. HP
                    </p>
                  </th>
                  <th className="border-y !border-[#E5E7EB] p-4">
                    <p className="block font-sans text-sm font-normal leading-none">
                      Total
                    </p>
                  </th>
                  <th className="border-y !border-[#E5E7EB] p-4">
                    <p className="block font-sans text-sm font-normal leading-none">
                      Status
                    </p>
                  </th>
                  <th className="border-y !border-[#E5E7EB] p-4">
                    <p className="block font-sans text-sm font-normal leading-none">
                      Detail Pesanan
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <>
                    <tr key={index} className="even:bg-[#F4F4F4]">
                      <td className="border-blue-gray-50 border-b p-4">
                        <div className="flex items-center gap-3">
                          <p className="block font-sans text-sm font-bold leading-normal">
                            {item.firstName} {item.lastName}
                          </p>
                        </div>
                      </td>
                      <td className="border-blue-gray-50 border-b p-4">
                        <p className="block font-sans text-sm font-normal leading-normal">
                          {item.phone}
                        </p>
                      </td>
                      <td className="border-blue-gray-50 border-b p-4">
                        <p className="block font-sans text-sm font-normal leading-normal">
                          {PriceFormat(item.total)}
                        </p>
                      </td>
                      <td className="border-blue-gray-50 border-b p-4">
                        <div className="w-max">
                          {item.status === "pending" ? (
                            <div className="relative grid select-none items-center whitespace-nowrap rounded-md bg-red-500/20 px-2 py-1 font-sans text-xs font-bold uppercase">
                              <span className="">Pending</span>
                            </div>
                          ) : item.status === "success" ? (
                            <div className="relative grid select-none items-center whitespace-nowrap rounded-md bg-green-500/20 px-2 py-1 font-sans text-xs font-bold uppercase">
                              <span className="">Success</span>
                            </div>
                          ) : (
                            <div className="relative grid select-none items-center whitespace-nowrap rounded-md bg-yellow-500/20 px-2 py-1 font-sans text-xs font-bold uppercase">
                              <span className="">Failed</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border-blue-gray-50 border-b p-4">
                        <div className="flex w-full items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsOpen((prevState) =>
                                prevState !== item._id ? item._id : null,
                              );
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-600"
                          >
                            <FaRegEye size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <Drawer
                      open={isOpen === item._id}
                      onClose={() => {
                        setIsOpen(null);
                      }}
                      lockBackgroundScroll
                      direction="right"
                      size={270}
                      className="size-full h-full"
                    >
                      <div
                        className={`h-full p-4 ${
                          isDarkMode
                            ? "bg-secondary text-white"
                            : "bg-white !text-black"
                        }`}
                      >
                        <h1 className="text-lg font-bold">
                          Detail Pesanan Dari {item.firstName}
                        </h1>
                        <div className="my-4">
                          {getUser.role === "admin" && (
                            <>
                              <h2>Detail Pembeli</h2>
                              <h2>Email: {item.email}</h2>
                              <h2>Phone: {item.phone}</h2>
                            </>
                          )}
                        </div>
                        {item.itemsDetail.map((product, index) => (
                          <div
                            className="mt-2 flex items-center justify-between"
                            key={index}
                          >
                            <div className="flex flex-col gap-2">
                              <h1 className="text-lg font-semibold">
                                {product.name}
                              </h1>
                              <h2 className="text-primary">
                                {PriceFormat(product.price)}
                              </h2>
                            </div>
                            <div className="h-full">
                              <h1 className="font-semibold">
                                pcs : {product.quantity}
                              </h1>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Drawer>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Navbar />
    </>
  );
}

export default OrderPage;
