import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CheckoutButton(props) {
  const {
    cartItems,
    cartTotal,
    numItemsInCart: totalItem, //MENGGUNAKAN ALIS NYA, HARUSNYA YAND ADA DI STATE ADALAH NUMITEMSINCART TAPI JADI TOTALITEM
  } = useSelector((state) => state.cartState);

  return (
    <footer
      className={`sticky bottom-0 h-16 py-1 w-full ${
        props.isDarkMode ? "bg-neutral-900 text-white" : "bg-white"
      }`}
    >
      <div className="flex h-full items-center justify-end gap-2">
        <h1>
          Total <span className="text-primary font-medium">{props.total}</span>
        </h1>
        {!totalItem > 0 ? (
          <button className="h-full items-center flex justify-center text-sm bg-slate-600 cursor-not-allowed font-bold text-gray-400 px-4 py-2">
            Tidak ada Produk
          </button>
        ) : (
          <button
            type="submit"
            className="h-full items-center flex justify-center text-sm bg-primary font-bold text-white px-4 py-2"
          >
            {props.children}
          </button>
        )}
      </div>
    </footer>
  );
}

export default CheckoutButton;
