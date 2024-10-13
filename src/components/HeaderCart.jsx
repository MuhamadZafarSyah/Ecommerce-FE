import React from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const HeaderCart = (props) => {
  const { type } = props;
  return (
    <header
      className={`sticky z-50 top-0 w-full h-12 px-4 items-center flex gap-4 justify-between items center ${
        props.isDarkMode ? "bg-neutral-900 text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <Link to={type === "cart" ? "/products" : "/my-cart"}>
          <LiaArrowLeftSolid size={25} color="red" />
        </Link>
        <div className="flex items-center gap-1">
          {type === "cart" ? (
            <>
              <h1 className="text-xl font-medium">Keranjang Saya</h1>
              <h2>({props.cartItems})</h2>
            </>
          ) : (
            <>
              <h1 className="text-xl font-medium">Checkout</h1>
            </>
          )}
        </div>
      </div>
      {props.children}
    </header>
  );
};

export default HeaderCart;
