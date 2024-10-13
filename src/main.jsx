import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, { action } from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import DetailPage from "./pages/DetailPage.jsx";
import AllProductPage from "./pages/AllProductPage.jsx";
import { DarkModeContextProvider } from "../src/context/DarkMode.jsx";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { SearchProvider } from "./context/SearchContext.jsx";

// IMPORT LOADER
import { loader as loaderHome } from "../src/getDataLoader.jsx";
import { loader as loaderAllProduct } from "./pages/AllProductPage.jsx";
import { loader as loaderOrder } from "./pages/OrderPage.jsx";

// IMPORT ACTION
import { action as LoginAction } from "./pages/auth/LoginPage.jsx";
import { action as RegisterAction } from "./pages/auth/RegisterPage.jsx";
// STOREAGE
import { store } from "./store/userStore";

import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import EditProductPage from "./pages/EditProductPage.jsx";
import CreateProductPage from "./pages/CreateProductPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    loader: loaderHome,
  },
  {
    path: "product/:id",
    element: <DetailPage />,
  },
  {
    path: "products",
    element: <AllProductPage />,
    loader: loaderAllProduct,
  },
  {
    path: "login",
    element: <LoginPage />,
    action: LoginAction(store),
  },
  {
    path: "register",
    element: <RegisterPage />,
    action: RegisterAction(store),
  },
  {
    path: "my-cart",
    element: <CartPage />,
  },
  {
    path: "checkout",
    errorElement: <ErrorPage />,
    element: <CheckoutPage />,
  },
  {
    path: "orders",
    element: <OrderPage />,
    loader: loaderOrder(store),
  },
  {
    path: "/product/:id/edit",
    element: <EditProductPage />,
  },
  {
    path: "/product/create",
    element: <CreateProductPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <DarkModeContextProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
      <ToastContainer position="top-right" />
    </DarkModeContextProvider>
  </Provider>,
);
