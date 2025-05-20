import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if(currentPage > totalPages) {
    console.error('The current page is greater than the total number of pages');
    return null;
  }

  const displayRange = 2;
  const paginationItems = [];

  for (let index = 1; index <= totalPages; index++) {
    if (
      index === 1 ||
      index === totalPages ||
      (index >= currentPage - displayRange && index <= currentPage + displayRange)
    ) {
      paginationItems.push(
        <li key={index} className="u-flex-center px-[5px]">
          <a
            className={`u-flex-center w-[30px] h-[30px] text-dark rounded-full @hover:(text-dark) ${currentPage === index ? 'bg-main text-white' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index}
          </a>
        </li>
      );
    } else if ((index === currentPage - displayRange - 1) || (index === currentPage + displayRange + 1)) {
      paginationItems.push(
        <li className="u-flex-center px-[5px]"><div className="u-flex-center w-[30px] h-[30px] text-dark rounded-full @hover:(text-dark)">...</div></li>
      )
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav>
      <ul className="flex flex-justify-center mx-[-5px] mb-0">
        <li className={`u-flex-center px-[5px]`}>
          <a className={`text-dark u-flex-center @hover:(text-dark) ${currentPage === 1 && 'opacity-50 pointer-event-none'}`} onClick={() => handlePageChange(1)}>第一頁</a>
        </li>
        <li className="u-flex-center px-[5px]">
          <a className="u-flex-center w-[30px] h-[30px] text-dark rounded-full @hover:(text-dark)" onClick={() => handlePageChange(currentPage - 1)}>
            <span className="i-iconamoon:arrow-left-2-light"></span>
          </a>
        </li>
        {paginationItems}
        <li className="u-flex-center px-[5px]">
          <a className="u-flex-center w-[30px] h-[30px] text-dark rounded-full @hover:(text-dark)" onClick={() => handlePageChange(currentPage + 1)}>
            <span className="i-iconamoon:arrow-right-2-light"></span>
          </a>
        </li>
        <li className="u-flex-center px-[5px]">
          <a className={`u-flex-center text-dark @hover:(text-dark) ${currentPage === 1 && 'opacity-50 pointer-event-none'}`} onClick={() => handlePageChange(totalPages)}>最後一頁</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
