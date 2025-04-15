import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav>
      <ul className="flex flex-justify-center mx--5 mb-0">
        <li className={`u-flex-center px-5`}>
          <a className={`text-dark u-flex-center @hover:(text-dark) ${currentPage === 1 && 'opacity-50 pointer-event-none'}`} onClick={() => handlePageChange(1)}>第一頁</a>
        </li>
        <li className="u-flex-center px-5">
          <a className="w-30 h-30 text-dark u-flex-center rounded-full @hover:(text-dark)" onClick={() => handlePageChange(currentPage - 1)}>
            <span className="i-iconamoon:arrow-left-2-light"></span>
          </a>
        </li>
        <li className="u-flex-center px-5">
          <a className={`w-30 h-30 text-dark u-flex-center rounded-full @hover:(text-dark) ${currentPage === 1 && 'bg-main text-white'}`} onClick={() => handlePageChange(1)}>1</a>
        </li>
        {currentPage > 2 && <li className="u-flex-center px-5"><div className="w-30 h-30 text-dark u-flex-center rounded-full @hover:(text-dark)">...</div></li>}
        {Array.from({ length: totalPages - 1 }, (_, index) => (
          <li key={index + 2} className="u-flex-center px-5">
            <a className={`w-30 h-30 text-dark u-flex-center rounded-full @hover:(text-dark) ${currentPage === index + 2 && 'bg-main text-white'}`} onClick={() => handlePageChange(index + 2)}>{index + 2}</a>
          </li>
        ))}
        <li className="u-flex-center px-5">
          <a className="w-30 h-30 text-dark u-flex-center rounded-full @hover:(text-dark)" onClick={() => handlePageChange(currentPage + 1)}>
            <span className="i-iconamoon:arrow-right-2-light"></span>
          </a>
        </li>
        <li className="u-flex-center px-5">
          <a className={`text-dark u-flex-center @hover:(text-dark) ${currentPage === 1 && 'opacity-50 pointer-event-none'}`} onClick={() => handlePageChange(totalPages)}>最後一頁</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
