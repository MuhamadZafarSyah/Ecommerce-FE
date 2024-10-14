import React, { useContext, useEffect } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import HeaderCart from "../components/HeaderCart";
import { FaMoon, FaSun } from "react-icons/fa";
import CheckoutButton from "../components/CheckoutButton";
import { PriceFormat } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader, PacmanLoader } from "react-spinners";
import Input from "../components/auth/Input";
import customAPI from "../api";
import { toast } from "react-toastify";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser, setLoading } from "../features/userSlice";
import { store } from "../store/userStore";
import useLogin from "../hooks/useLogin";

// CARA MENYUNTIKKAN SCRIPT ATAU CDN KE HALAMAN TERTENTU
const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_CLIENT_MIDTRANS,
    );
    script.onload = () => resolve();

    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const getUser = useSelector((state) => state.userState.user);

  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const isLoadingRequest = useSelector((state) => state.userState.isLoading);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const { cartTotal } = useSelector((state) => state.cartState);
  const cart = useSelector((state) => state.cartState.cartItems);

  // console.log(cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    const cartData = cart.map((item) => {
      return {
        product: item.productId,
        quantity: item.amount,
      };
    });
    try {
      store.dispatch(setLoading(true));

      const response = await customAPI.post("/order", {
        email: data.email,
        firstName: data.firstname,
        lastName: data.lastname,
        phone: data.phone,
        cartItem: cartData,
      });

      if (response.status === 401) {
        dispatch(logoutUser());
        navigate("/login");
      }

      const snapToken = response.data.token;

      window.snap.pay(snapToken.token, {
        // Optional
        onSuccess: function (result) {
          console.log(result);
          store.dispatch(setLoading(false));
          dispatch(clearCart());
          navigate("/my-cart");
        },
        // Optional
        onPending: function (result) {
          console.log(result);
          alert("Transaction Pending!");
        },
        // Optional
        onError: function (result) {
          console.log(result);
          alert("Transaction error!");
        },
      });
      toast.success("Berhasil Order");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      const unautharized = error?.response?.status === 401;
      if (unautharized) {
        navigate("/login");
        return redirect("/login");
      }
    } finally {
      store.dispatch(setLoading(false));
    }
  };

  return (
    <>
      {isLoading && (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center overflow-hidden rounded-2xl bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      )}
      <HeaderCart isDarkMode={isDarkMode}>
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="cursor-pointer p-2"
          >
            {!isDarkMode ? (
              <FaMoon size={20} color="red" />
            ) : (
              <FaSun size={20} color="red" />
            )}
          </div>
        </div>
      </HeaderCart>

      <form onSubmit={handleCheckout} method="post">
        <div
          className={`min-h-screen pb-10 ${
            isDarkMode ? "bg-secondary text-white" : "bg-whitemode text-black"
          }`}
        >
          <div className="pt-4">
            <div className="flex flex-col gap-4">
              <div
                className={`w-full rounded-2xl p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="namadepan">
                  Nama Depan <span className="text-red-600">*</span>
                </label>
                <Input
                  classname="w-full mt-2"
                  id="namadepan"
                  name="firstname"
                  placeholder="Nama Depan"
                  type="text"
                />
              </div>
              <div
                className={`w-full rounded-2xl p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="namabelakang">
                  Nama Belakang <span className="text-red-600">*</span>
                </label>
                <Input
                  classname="w-full mt-2"
                  id="namabelakang"
                  name="lastname"
                  placeholder="Nama Belakang"
                  type="text"
                />
              </div>
              <div
                className={`w-full rounded-2xl p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="">
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  defaultValue={getUser.email}
                  classname="mt-2 bg-gray-100  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="email"
                  name="email"
                  placeholder="Nama Depan"
                  type="email"
                />
              </div>
              <div
                className={`w-full rounded-2xl p-4 shadow-lg ${
                  isDarkMode ? "bg-neutral-900" : "bg-white"
                }`}
              >
                <label htmlFor="phone">
                  Nomor Handphone <span className="text-red-600">*</span>
                </label>
                <Input
                  classname="w-full mt-2"
                  id="phone"
                  name="phone"
                  placeholder="Nomor Handphone"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <CheckoutButton
          type="submit"
          total={PriceFormat(cartTotal)}
          // countCart={totalItem}
          isDarkMode={isDarkMode}
        >
          {isLoadingRequest ? (
            <ClipLoader size={20} color="white" />
          ) : (
            "Bayar Sekarang"
          )}
        </CheckoutButton>
      </form>
    </>
  );
};

export default CheckoutPage;
