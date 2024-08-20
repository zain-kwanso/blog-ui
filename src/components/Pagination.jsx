import React, { useState } from "react";
import PropTypes from "prop-types";

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
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setItemsPerPage(newLimit);
    onLimitChange(newLimit);
  };

  // Calculate visible page numbers
  const maxVisiblePages = 5; // Number of page buttons to display
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfVisiblePages, 1);
  let endPage = Math.min(currentPage + halfVisiblePages, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex items-center mb-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:opacity-50"
        >
          First
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:opacity-50"
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 border rounded-lg mx-1 bg-white"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-4 py-2 border rounded-lg mx-1 bg-white">
                ...
              </span>
            )}
          </>
        )}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 border rounded-lg mx-1 ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-4 py-2 border rounded-lg mx-1 bg-white">
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 border rounded-lg mx-1 bg-white"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:opacity-50"
        >
          Next
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:opacity-50"
        >
          Last
        </button>
      </div>

      <div className="flex items-center">
        <label htmlFor="itemsPerPage" className="mr-2 text-gray-700">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleLimitChange}
          className="px-2 py-1 border rounded-lg"
        >
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
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
