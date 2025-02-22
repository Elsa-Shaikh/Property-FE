import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="mt-4 flex justify-end items-end space-x-2">
      <button
        className={`cursor-pointer px-2 py-2 ${
          currentPage === 1 ? "bg-gray-300" : "bg-blue-400 text-white"
        } rounded-lg`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoChevronBack />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`cursor-pointer px-4 py-1 rounded-lg ${
            currentPage === index + 1 ? "bg-blue-400 text-white" : "bg-gray-300"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={`cursor-pointer px-2 py-2 ${
          currentPage === totalPages ? "bg-gray-300" : "bg-blue-400 text-white"
        } rounded-lg`}
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <IoChevronForward />
      </button>
    </div>
  );
};

export default Pagination;
