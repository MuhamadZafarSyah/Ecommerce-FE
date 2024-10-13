import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const useProductFilter = (initialProducts, categories, pagination) => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  const handleCategoryClick = (category) => {
    const currentSearch = searchParams.get("name") || "";
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", category);
    newParams.set("page", "1");
    if (currentSearch) {
      newParams.set("name", currentSearch);
    } else {
      newParams.delete("name");
    }
    navigate(`/products?${newParams.toString()}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    // const currentCategory = searchParams.get("category") || "";
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    if (search) {
      newParams.set("name", search);
    } else {
      newParams.delete("name");
    }
    // if (currentCategory) {
    //   newParams.set("category", currentCategory);
    // }
    navigate(`/products?${newParams.toString()}`);
  };

  return {
    filteredProducts,
    handleCategoryClick,
    handleSearch,
    currentSearch: searchParams.get("name") || "",
    currentCategory: searchParams.get("category") || "",
    pagination,
  };
};
