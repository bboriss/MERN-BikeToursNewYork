import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import "./Pagination.css";

function PaginationRef({ tours, totalSearchNumber, pageSetter }) {
  const data = tours;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentItems(data);
    setPageCount(Math.ceil(totalSearchNumber / itemsPerPage));
  }, [totalSearchNumber]);

  const handlePageClick = (event) => {
    const newPage = event.selected + 1;
    pageSetter(newPage);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page_num"
        previousLinkClassName="page_num"
        nextLinkClassName="page_num"
        activeClassName={"active"}
      />
    </>
  );
}

export default PaginationRef;
