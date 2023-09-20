import { useEffect, useState } from "react";

const Pagination = (props) => {
  const { nPages, currentPage, setCurrentPage } = props;
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <nav className="flex items-center justify-center">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              className="flex items-center justify-center px-3 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
              onClick={prevPage}
              href="#"
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((pgNumber) => (
            <li key={pgNumber} className={` : `}>
              <a
                onClick={() => setCurrentPage(pgNumber)}
                className={`flex items-center justify-center font-bold px-3 h-10 leading-tight text-gray-500 ${
                  currentPage === pgNumber ? "bg-blue-600" : "bg-white"
                } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          <li>
            <a
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
              onClick={nextPage}
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
