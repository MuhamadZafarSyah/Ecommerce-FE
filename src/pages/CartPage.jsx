import React, { useContext } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { Link, useNavigation } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { PacmanLoader } from "react-spinners";
import { FaMoon, FaSun } from "react-icons/fa";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import { useSelector } from "react-redux";
import { PriceFormat } from "../utils/index";
import HeaderCart from "../components/HeaderCart";
import useLogin from "../hooks/useLogin";
function CartPage() {
  useLogin();
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const {
    cartItems,
    cartTotal,
    numItemsInCart: totalItem, //MENGGUNAKAN ALIS NYA, HARUSNYA YAND ADA DI STATE ADALAH NUMITEMSINCART TAPI JADI TOTALITEM
  } = useSelector((state) => state.cartState);

  return (
    <>
      {isLoading && (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      )}
      <HeaderCart
        type="cart"
        cartItems={cartItems.length}
        isDarkMode={isDarkMode}
      >
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

          <AiOutlineMessage size={23} color="red" />
        </div>
      </HeaderCart>
      <div
        className={`min-h-screen pb-10 ${
          isDarkMode ? "bg-secondary text-white" : "bg-whitemode text-black"
        }`}
      >
        <div className="flex flex-col gap-4 pt-2">
          {cartTotal === 0 ? (
            <section className="flex h-screen items-center justify-center">
              <h1 className="text-center">Keranjangmu Kosong</h1>
            </section>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartItem
                  key={item.cartId}
                  cartItem={item}
                  isDarkMode={isDarkMode}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <CheckoutButton total={PriceFormat(cartTotal)} isDarkMode={isDarkMode}>
        <Link to={"/checkout"}>Checkout({totalItem})</Link>
      </CheckoutButton>
    </>
  );
}

export default CartPage;
