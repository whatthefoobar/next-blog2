interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`px-4 py-2 border border-gray-300 rounded ${
            currentPage === pageNumber
              ? "bg-teal-700 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
