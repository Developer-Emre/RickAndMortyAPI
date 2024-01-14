import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='flex justify-center mt-4'>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => onPageChange(number)} className={`pagination-btn px-4 py-2 mx-1 text-white ${currentPage === number ? 'active' : ''}`}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;