import ShopeeFitur from "../components/ShopeeFitur.jsx";
import ShopeePayFitur from "../components/ShopeePayFitur.jsx";
import Header from "../components/Header.jsx";
import { useContext } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { DarkModeContext } from "../context/DarkMode.jsx";
import { PacmanLoader } from "react-spinners";
import useLogin from "../hooks/useLogin.jsx";

const HomePage = () => {
  useLogin();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { products } = useLoaderData();

  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <>
      {isLoading && (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      )}
      <Header />
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-secondary" : "bg-whitemode"
        }`}
      >
        <div className="!-mt-1 h-4 bg-gradientPrimary"></div>
        <ShopeePayFitur />
        <ShopeeFitur />
        <div className="pb-4">
          <div className="mt-5 grid grid-cols-2 gap-1 px-1">
            {products.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
          <Link
            to={"/products"}
            className="center-center mx-auto mt-5 w-fit bg-[#FF0000] p-2 px-10 text-white shadow-lg"
          >
            See More
          </Link>
        </div>
      </div>

      <Navbar />
    </>
  );
};

export default HomePage;
