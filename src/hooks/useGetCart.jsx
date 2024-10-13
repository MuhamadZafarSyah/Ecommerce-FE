import { useEffect, useState } from "react";
const useGetCart = () => {
  const [countCart, setCountCart] = useState(0);

  const getDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    if (getDataFromLocalStorage) {
      const countCart = getDataFromLocalStorage.cartItems.length;
      setCountCart(countCart);
    }
  }, []);
};

export default useGetCart;
