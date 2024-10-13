import React from "react";
import { Link, useLocation } from "react-router-dom";

const Pagination = ({ currentPage, totalPages }) => {
  const location = useLocation();

  const createPageUrl = (page) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", page);
    return `${location.pathname}?${searchParams.toString()}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Jumlah maksimal tombol halaman yang ditampilkan

    if (totalPages <= maxPagesToShow) {
      // Jika total halaman kurang dari atau sama dengan maxPagesToShow, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Logika untuk menampilkan halaman dengan elipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <Link
              to={createPageUrl(page)}
              className={`px-3 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-200"
              }`}
            >
              {page}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Pagination;
