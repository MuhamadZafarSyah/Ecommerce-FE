import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useParams } from "react-router-dom";
import customAPI from "../api";
import Input from "../components/auth/Input";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { ClipLoader, PacmanLoader } from "react-spinners";
import { DarkModeContext } from "../context/DarkMode";
import { useSelector } from "react-redux";
import { setLoading } from "../features/userSlice";
import { store } from "../store/userStore";
import { toast } from "react-toastify";

const EditProductPage = () => {
  const { id } = useParams();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { isDarkMode } = useContext(DarkModeContext);
  const category = ["sepatu", "kemeja", "baju", "celana", "topi", "hoodie"];

  const isLoadingRequest = useSelector((state) => state.userState.isLoading);

  const [product, setProduct] = useState("");
  const [preview, setPreview] = useState("");

  const DetailProduct = async () => {
    const { data } = await customAPI.get(`/product/${id}`);
    setProduct(data.data);
  };

  useEffect(() => {
    DetailProduct();

    window.scrollTo(0, 0);
  }, []);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    try {
      store.dispatch(setLoading(true));

      const response = await customAPI.put(`/product/${id}`, {
        name: data.name,
        price: data.price,
        category: data.category,
        description: data.description,
        stock: data.stock,
      });

      if (response.status === 401) {
        dispatch(logoutUser());
        navigate("/login");
      }

      store.dispatch(setLoading(false));

      toast.info("Berhasil edit data produk");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
    } finally {
      store.dispatch(setLoading(false));
    }
  };

  return (
    <>
      {product ? (
        <>
          <Header />
          <div
            className={`relative min-h-screen pb-10 ${
              isDarkMode
                ? "bg-secondary !text-white"
                : "bg-whitemode text-black"
            }`}
          >
            <form
              onSubmit={handleEditProduct}
              encType="multipart/formdata"
              className="flex flex-col gap-4 pt-4"
            >
              <div
                className={`w-full rounded-md p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="name">
                  Nama Produk <span className="text-red-600">*</span>
                </label>
                <Input
                  classname="w-full mt-2 "
                  id="name"
                  defaultValue={product.name}
                  name="name"
                  type="text"
                />
              </div>
              <div
                className={`w-full rounded-md p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="price">
                  Harga Produk <span className="text-red-600">*</span>
                </label>
                <Input
                  classname="w-full mt-2"
                  id="price"
                  name="price"
                  defaultValue={product.price}
                  placeholder={product.price}
                  type="text"
                />
              </div>
              <div
                className={`w-full rounded-md p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="stock">
                  Stock Produk <span className="text-red-600">*</span>
                </label>
                <Input
                  classname="w-full mt-2"
                  id="stock"
                  name="stock"
                  defaultValue={product.stock}
                  type="number"
                />
              </div>
              <div
                className={`w-full rounded-md p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="stock">
                  Kategori Produk <span className="text-red-600">*</span>
                </label>
                <select
                  className="w-f mt-1 block w-full bg-transparent p-1"
                  name="category"
                  placeholder={product.category}
                  id="category"
                >
                  {category.map((item) => (
                    <option
                      className={` ${
                        isDarkMode
                          ? "bg-secondary !text-white"
                          : "bg-whitemode text-black"
                      }`}
                      value={item}
                      key={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div
                className={`w-full rounded-md p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <div className="relative w-full min-w-[200px]">
                  <textarea
                    name="description"
                    className="border-blue-gray-200 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0"
                    placeholder=" "
                    defaultValue={product.description}
                  ></textarea>
                  <label className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent">
                    Deskripsi Produk
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mx-auto w-10/12 rounded-md bg-primary p-3 text-white shadow-2xl"
              >
                {isLoadingRequest ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "Buat Data Produk"
                )}
              </button>
            </form>
          </div>
          <Navbar />
        </>
      ) : (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      )}
    </>
  );
};

export default EditProductPage;
