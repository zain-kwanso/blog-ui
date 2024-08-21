import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { CurrencyEuroIcon } from "@heroicons/react/outline";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onLimitChange,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      showToast(
        "The Page that you are trying exist doesn't exist\nSo you are being redirected to first page"
      );
      onPageChange(1);
    }
  };
  const showToast = (message) => {
    toast.error(message, {
      autoClose: 2000,
      hideProgressBar: true,
    });
  };
  useEffect(() => {
    if (!(currentPage >= 1 && currentPage <= totalPages)) {
      showToast(
        "The Page that you are trying exist doesn't exist\nSo you are being redirected to first page"
      );
      onPageChange(1);
    }
  }, []);

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setItemsPerPage(newLimit);
    onLimitChange(newLimit);
  };

  // Calculate the previous and next page numbers
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(prevPage)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 transition-colors hover:bg-gray-600"
        >
          Prev
        </button>

        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-gray-800 bg-white transition-colors hover:bg-gray-100"
          >
            {currentPage - 1}
          </button>
        )}

        <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full bg-blue-600 text-white">
          {currentPage}
        </button>

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full text-gray-800 bg-white transition-colors hover:bg-gray-100"
          >
            {currentPage + 1}
          </button>
        )}

        <button
          onClick={() => handlePageChange(nextPage)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 transition-colors hover:bg-gray-600"
        >
          Next
        </button>
      </div>

      {/* Items per page selector */}
      <div className="flex items-center space-x-2 mt-4">
        <label htmlFor="itemsPerPage" className="text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleLimitChange}
          className="px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Pagination;
