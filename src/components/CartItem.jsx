import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { generateSelectAmount, PriceFormat } from "../utils/index";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "../features/cartSlice";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/react-swipeable-list.esm";
import "react-swipeable-list/dist/styles.css";
import { removeItem } from "../features/cartSlice";

const trailingActions = (cartId) => {
  const dispatch = useDispatch();

  return (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch(removeItem({ cartId }))}
      >
        <div className="flex size-full items-center justify-center bg-primary pr-10 text-center text-white">
          <h1>Hapus</h1>
        </div>
      </SwipeAction>
    </TrailingActions>
  );
};

const CartItem = ({ cartItem, isDarkMode }) => {
  const { cartId, name, price, amount, image, stock } = cartItem;

  // STORE
  const dispatch = useDispatch();

  const handleAmount = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  return (
    <SwipeableList className="w-full shadow-lg">
      <SwipeableListItem trailingActions={trailingActions(cartId)}>
        <div
          key={cartId}
          className={`mx-1 w-full rounded-lg px-5 py-4 shadow-lg ${
            isDarkMode ? "bg-neutral-900" : "bg-white"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="size-28 shrink-0 rounded-2xl">
              <img
                className="h-full w-full rounded-2xl object-cover"
                src={
                  image ||
                  "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                }
                alt={name}
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <h1 className="text-xs">{name}</h1>
              <div className="my-1 flex items-center justify-start">
                <div className="border border-[#FF0000] px-[4px] py-[1px] text-[8px] text-[#FF0000]">
                  {price < 500000 ? "Termurah di Shopee" : "Produk Baru"}
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <h2 className="font-bold text-primary">
                  {PriceFormat(price * amount)}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="text-xs">Pcs:</div>
                  <select
                    name="amount"
                    value={amount}
                    onChange={handleAmount}
                    className="w-full rounded-lg border bg-transparent px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {generateSelectAmount(stock)}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <CiDeliveryTruck size={40} color="green" />
            <h1 className="text-xs">
              Gratis Ongkir s/d Rp15.000 dengan min. belanja Rp0; Gratis ongkir
              s/d Rp250.000 dengan min
            </h1>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default CartItem;
