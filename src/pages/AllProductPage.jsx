import React, { useContext } from "react";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { DarkModeContext } from "../context/DarkMode";
import { useSearch } from "../context/SearchContext";
import { useProductFilter } from "../hooks/useProductFilter";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList";
import customAPI from "../api";
import Pagination from "../components/Pagination";
import { PacmanLoader } from "react-spinners";
import useLogin from "../hooks/useLogin";

const CATEGORIES = ["sepatu", "kemeja", "baju", "celana", "topi", "hoodie"];

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 6;

  try {
    const { data } = await customAPI.get("/product", {
      params: { ...Object.fromEntries(url.searchParams), page, limit },
    });

    return {
      products: data.data,
      pagination: data.pagination,
      message: data.message,
    };
  } catch (error) {
    // console.error("Error loading products:", error);
    return {
      products: [],
      pagination: {
        totalPage: 0,
        page: 1,
        totalProduct: 0,
      },
      message: "Error loading products",
    };
  }
};

function AllProduct() {
  useLogin();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const { isDarkMode } = useContext(DarkModeContext);
  const { setFocusSearch } = useSearch();
  const { products, pagination } = useLoaderData();

  const {
    filteredProducts,
    handleCategoryClick,
    handleSearch,
    currentSearch,
    currentCategory,
  } = useProductFilter(products, CATEGORIES, pagination);

  const onCategoryClick = (category) => {
    handleCategoryClick(category);
    setFocusSearch(true);
  };

  const onSearch = (e) => {
    handleSearch(e);
    setFocusSearch(true);
  };

  return (
    <>
      {isLoading && (
        <main className="fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center overflow-hidden rounded-md bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
          <PacmanLoader color="#FF0000" className="z-50" />
        </main>
      )}
      <Form className="sticky top-0 z-40" method="get" onSubmit={onSearch}>
        <Header search={currentSearch}>
          <CategoryList
            categories={CATEGORIES}
            onCategoryClick={onCategoryClick}
            currentCategory={currentCategory}
          />
        </Header>
      </Form>

      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-secondary text-white" : "bg-whitemode text-black"
        }`}
      >
        <div className="grid grid-cols-2 gap-2 px-1 py-5">
          {filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPage}
        />
        <p className="text-center">Total Products: {pagination.totalProduct}</p>
      </div>
      <Navbar />
    </>
  );
}

export default AllProduct;
