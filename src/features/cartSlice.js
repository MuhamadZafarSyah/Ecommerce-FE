import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultValue;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCart(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find(
        (item) => item.cartId === product.cartId,
      );
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Berhasil ditambahkan ke keranjang", { autoClose: 1000 });
    },

    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultValue));
      return defaultValue;
    },

    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const itemProduct = state.cartItems.find(
        (item) => item.cartId === cartId,
      );

      state.numItemsInCart += amount - itemProduct.amount;
      // atau state.numItemsInCart = state.numItemsInCart + (amount - itemProduct.amount)
      state.cartTotal += itemProduct.price * (amount - itemProduct.amount);
      itemProduct.amount = amount;

      localStorage.setItem("cart", JSON.stringify(state));
      toast.info("Berhasil edit keranjang", { autoClose: 1000 });
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const itemProduct = state.cartItems.find(
        (item) => item.cartId === cartId,
      );
      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== cartId,
      );
      state.numItemsInCart -= itemProduct.amount;
      state.cartTotal -= itemProduct.price * itemProduct.amount;

      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Produk berhasil dihapus dari keranjang", {
        autoClose: 1000,
      });
    },
  },
});

export const { addItem, editItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
